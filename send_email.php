<?php
// Include the PhpSpreadsheet library
require 'vendor/autoload.php'; // Make sure the path is correct if you're using Composer

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $number = $_POST['number'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Create a new Spreadsheet
    $spreadsheet = new Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();

    // Set the headers for the Excel file
    $sheet->setCellValue('A1', 'Name');
    $sheet->setCellValue('B1', 'Email');
    $sheet->setCellValue('C1', 'Phone');
    $sheet->setCellValue('D1', 'Subject');
    $sheet->setCellValue('E1', 'Message');
    
    // Write the form data into the next row
    $sheet->setCellValue('A2', $name);
    $sheet->setCellValue('B2', $email);
    $sheet->setCellValue('C2', $number);
    $sheet->setCellValue('D2', $subject);
    $sheet->setCellValue('E2', $message);

    // Create a writer to save the file as an Excel (.xlsx)
    $writer = new Xlsx($spreadsheet);

    // Save the Excel file in the desired location
    $filename = 'contact_form_data.xlsx';

    try {
        // Save the file (it will overwrite if the file already exists)
        $writer->save($filename);
        echo "Data saved to Excel file successfully!";
    } catch (Exception $e) {
        echo "Error saving file: " . $e->getMessage();
    }
}
?>
