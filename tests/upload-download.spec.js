const ExcelJs = require('exceljs');
const {test,expect} = require('@playwright/test')





async function writeExcelTest (searchText,updateValue,filePath) {
    
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
                //look for the value in the excel sheet
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


test('Upload download excel Validation', async ({ page }) => {
    const downloadPath = 'tests/utils/download.xlsx';
    const orignalText = "Mango"
    const changedTextSearch= "Testing"
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");

    // Start waiting for download before clicking
    const orignalTextLocator =  page.getByText(orignalText)
    await expect(orignalTextLocator).toBeVisible()
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    
    const download = await downloadPromise;

    // Save the downloaded file to your specific path
    await download.saveAs(downloadPath);

    // Call excel function (added await here to ensure it finishes before upload)
    await writeExcelTest("Mango", changedTextSearch, downloadPath);

    // Upload file
    // Note: Use setInputFiles directly on the input; clicking it often opens a system dialog which hangs the test
    await page.locator('input[type="file"]').setInputFiles(downloadPath);

    const textlocator = page.getByText(changedTextSearch)

    const updateVerification= page.getByText('Updated Excel Data')

    await expect(updateVerification).toBeVisible()

    await expect(textlocator).toBeVisible()


    await expect(orignalTextLocator).toBeHidden()
    
    
});
