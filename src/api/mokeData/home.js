export default {
    getHomeData: () => {
        return {
            code: 200,
            data: {
                tableData: [
                    {
                        name: '小米',
                        todayBuy: 1200,
                        monthBuy: 6500,
                        totalBuy: 45000
                    }, {
                        name: '三星',
                        todayBuy: 300,
                        monthBuy: 2000,
                        totalBuy: 34000
                    }, {
                        name: '華為',
                        todayBuy: 456,
                        monthBuy: 2300,
                        totalBuy: 33000
                    }, {
                        name: '頻果',
                        todayBuy: 1000,
                        monthBuy: 6500,
                        totalBuy: 55000
                    }
                ]
            }
        }
    }
}