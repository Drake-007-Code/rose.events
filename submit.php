<?php
require 'vendor/autoload.php'; // Include PhpSpreadsheet

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // File path to store the Excel file
    $filePath = 'contact_data.xlsx';

    // Check if the file already exists
    if (file_exists($filePath)) {
        // Load existing spreadsheet
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($filePath);
        $sheet = $spreadsheet->getActiveSheet();
    } else {
        // Create a new spreadsheet
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        // Set headers
        $sheet->setCellValue('A1', 'Name');
        $sheet->setCellValue('B1', 'Email');
        $sheet->setCellValue('C1', 'Message');
    }

    // Find the next empty row
    $row = $sheet->getHighestRow() + 1;

    // Add form data to the spreadsheet
    $sheet->setCellValue('A' . $row, $name);
    $sheet->setCellValue('B' . $row, $email);
    $sheet->setCellValue('C' . $row, $message);

    // Save the spreadsheet to a file
    $writer = new Xlsx($spreadsheet);
    $writer->save($filePath);

    echo "Thank you for contacting us!";
} else {
    echo "Invalid request.";
}
?>