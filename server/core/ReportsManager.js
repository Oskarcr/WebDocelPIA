import { Metadata, Report, Sale } from "#DocelServer";

class ReportsGenerator {
    /**@type {any[]} */
    #cache = null;
    /**@type {Date} */
    #lastGeneration = null;
    #processing = false;
    #REPORT_MIN_DATE = new Date(Date.UTC(2026, 2, 1));

    async #update() {
        const now = this.getCurrentMonthStart();
        const nowTimestamp = now.getTime();
        const last = await this.getLastMonthGeneration();

        let current = new Date(last.getTime()); 
        
        const reports = [];
        let folio = (await this.lastFolio()) + 1;
        
        while(current.getTime() < nowTimestamp) {
            const range = this.getMonthDateRange(current);
            const sales = await Sale.find({
                createdAt: range 
            }, { 
                _id: 1,
                total: 1,
            });

            const report = {
                sales: [], 
                income: 0, 
                period: new Date(current.getTime()),
                folio: folio
            };
            
            for(const { _id, total } of sales) {
                report.sales.push(_id);
                report.income += total;
            }

            reports.push(report);
            current = new Date(Date.UTC(current.getUTCFullYear(), current.getUTCMonth() + 1, 1));
            folio++;
        } 

        if (reports.length > 0) await Report.insertMany(reports);

        await this.#updateLastGeneration();
    }

    async #fetch(force = false) {
        if(this.#cache && !force) return;
        this.#cache = await Report.find().select("-sales");
    }

    async #updateLastGeneration() {
        let metadata = await Metadata.findOne();
        const now = new Date();
        
        if(!metadata) {
            metadata = await Metadata.create({ lastReportGeneration: now });
        } else {
            metadata.lastReportGeneration = now;
            await metadata.save();
        }
        
        const lrg = metadata.lastReportGeneration;
        this.#lastGeneration = new Date(Date.UTC(lrg.getUTCFullYear(), lrg.getUTCMonth(), 1));
    }

    /**
     * Devuelve una consulta valida para el mes actual en formato `UTC`.
     * @param {Date} current 
     */
    getMonthDateRange(current) {
        const year = current.getUTCFullYear();
        const month = current.getUTCMonth();

        return {
            $gte: new Date(Date.UTC(year, month, 1)),
            $lt: new Date(Date.UTC(year, month + 1, 1))
        };
    }

    /**
     * Devuelve el dia 1 del mes actual en formato `UTC`.
     */
    getCurrentMonthStart() {
        const now = new Date();
        return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
    }

    /**
     * Un `date` que representa el ultimo mes en el que se
     * genero por ultima vez los reportes.
     */
    async getLastMonthGeneration() {
        if(this.#lastGeneration) return this.#lastGeneration;

        let metadata = await Metadata.findOne();

        if(!metadata) {
            metadata = await Metadata.create({
                lastReportGeneration: this.#REPORT_MIN_DATE
            });
        }

        const lrg = metadata.lastReportGeneration;
        this.#lastGeneration = new Date(Date.UTC(lrg.getUTCFullYear(), lrg.getUTCMonth(), 1));
        return this.#lastGeneration;
    }

    /**
     * Devuelve el siguiente folio del modelo de `Reports`.
     */
    async lastFolio() {
        const last = await Report.findOne().sort({ folio: -1 });
        if(!last) return 0;
        return last.folio;
    }

    /**
     * Es `true` si se considera que necesita actualizarse.
     */
    async needsUpdate() {
        const now = new Date();
        const last = await this.getLastMonthGeneration();
        return this.isDifferentPeriod(now, last);
    }

    /**
     * Devuelve `true` si `periodA` tiene un periodo de mes
     * diferente de `periodB`.
     * @param {Date} periodA 
     * @param {Date} periodB 
     */
    isDifferentPeriod(periodA, periodB) {
        const isDifferentYear = periodA.getFullYear() !== periodB.getFullYear();
        const isDifferentMonth = periodA.getMonth() !== periodB.getMonth();
        return isDifferentMonth || isDifferentYear;
    }   

    /**
     * Devuelve una lista interna de reportes almacenados en memoria.
     */
    async getCache() {
        if(this.#processing) {
            const msg = "Se esta generando el reporte. Por favor intentelo mas tarde.";
            throw new Error(msg);
        }
        const needsUpdate = await this.needsUpdate();
        if(this.#cache && !needsUpdate) return this.#cache;
        this.#processing = true;

        if(needsUpdate) await this.#update();
        await this.#fetch();

        this.#processing = false;
        return this.#cache;
    }
}

const ReportsManager = new ReportsGenerator();
export default ReportsManager;