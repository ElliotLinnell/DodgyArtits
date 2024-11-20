<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $fullName = htmlspecialchars($_POST['full_name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $addressLine1 = htmlspecialchars($_POST['address_line1']);
    $addressLine2 = htmlspecialchars($_POST['address_line2']);
    $city = htmlspecialchars($_POST['city']);
    $county = htmlspecialchars($_POST['county']);
    $postalCode = htmlspecialchars($_POST['postal_code']);
    $country = htmlspecialchars($_POST['country']);

    $subject = "Payment Confirmation";
    $message = "
    Dear $fullName,

    Thank you for your payment. Here are the details you provided:

    Name: $fullName
    Email: $email
    Phone: $phone

    Address:
    $addressLine1
    $addressLine2
    $city, $county, $postalCode, $country

    If you have any questions, please contact us.

    Best regards,
    Your Company
    ";

    $headers = "From: no-reply@yourdomain.com\r\n";
    $headers .= "Reply-To: support@yourdomain.com\r\n";

    if (mail($email, $subject, $message, $headers)) {
        
        header("Location: confirmation.html");
        exit();
    } else {
        echo "Error: Unable to send confirmation email.";
    }
} else {
    echo "Invalid request method.";
}
?>
