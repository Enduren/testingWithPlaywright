const ExcelJs = require('exceljs');
const { promises } = require('node:dns');


// const workbook = new ExcelJs.Workbook()
// workbook.xlsx.readFile("tests/utils/download.xlsx").then(function () {
//     const worksheet1 = workbook.getWorksheet('Sheet1')
//     console.log("Running promise then...")

//     //this will show all the rows that have values in a worksheet
//     worksheet1.eachRow((row,rowNumber)=>
//     {

//         row.eachCell((cell,colNumber)=>{
            
//             console.log(cell.value) ;
//         })

//     })
// })

// async function excelTest () {
    
//     const workbook = new ExcelJs.Workbook()
//     let output={row:-1,column:-1}
//     await workbook.xlsx.readFile("tests/utils/download.xlsx")
//         const worksheet1 = workbook.getWorksheet('Sheet1')
//         console.log("Running excelTest...")

//         //this will show all the rows that have values in a worksheet
//         worksheet1.eachRow((row,rowNumber)=>
//         {
            
//             row.eachCell((cell,colNumber)=>{
//                 //look for  value in the excel sheet
//                 if (cell.value === "Banana" ) {
                     
//                     output.row= rowNumber;
//                     output.column= colNumber;
//                     console.log(`The row number is: ${output.row}`)
//                      console.log(`The column number is:${output.column}`)
//                 }
//             })

//         })

//         //update value
//         const cell = worksheet1.getCell(output.row,output.column)
//         //update it to new value
//         cell.value = "QMTest"
//         await workbook.xlsx.writeFile("tests/utils/download.xlsx")
    

// }


async function writeExcelTest (searchText,filePath,updateValue) {
    
    const workbook = new ExcelJs.Workbook()
    
    await workbook.xlsx.readFile(filePath)
        const worksheet = workbook.getWorksheet('Sheet1')
        console.log("Running excelTest...")

       
       const output = await readExcel(worksheet,searchText)

        //update value
        const cell = worksheet.getCell(output.row,output.column)
        //update it to new value
        cell.value = `${updateValue}`
        await workbook.xlsx.writeFile(filePath)
    

}

async function readExcel(worksheet,searchText) {

    let output={row:-1,column:-1}
     //this will show all the rows that have values in a worksheet
        worksheet.eachRow((row,rowNumber)=>
        {
            
            row.eachCell((cell,colNumber)=>{
                //look for  value in the excel sheet
                if (cell.value === `${searchText}` ) {
                     
                    output.row= rowNumber;
                    output.column= colNumber;
                    console.log(`The row number is: ${output.row}`)
                    console.log(`The column number is:${output.column}`)
                }
            })

        })
        return output;
}
// writeExcelTest("Sammy","tests/utils/download.xlsx","Testing")

test('Upload download excel Validation', async ({ page }) => {
    
})
