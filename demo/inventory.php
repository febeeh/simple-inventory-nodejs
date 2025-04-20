<?php
$apiBaseUrl = "http://localhost:3000";

// Fetch stock
$stockResponse = file_get_contents("$apiBaseUrl/inventory/stock");
$stockData = json_decode($stockResponse, true);
$stockList = $stockData["success"] ? $stockData["result"] : [];

$errorMsg = "";

// Fetch products
$productResponse = file_get_contents("$apiBaseUrl/product/getProducts");
$productData = json_decode($productResponse, true);
$products = $productData["success"] ? $productData["result"] : [];

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if ($_POST["formType"] === "addProduct") {
        $productName = $_POST["productName"];
        $postData = ["name" => $productName];

        $options = [
            "http" => [
                "header" => "Content-Type: application/json",
                "method" => "POST",
                "content" => json_encode($postData),
                "ignore_errors" => true,
            ],
        ];
        $context = stream_context_create($options);
        $response = file_get_contents("$apiBaseUrl/product/insertProduct", false, $context);
        $responseData = json_decode($response, true);

        if (isset($responseData["error"])) {
            $errorMsg = $responseData["error"];
        } else {
            echo "<script>alert('Product added successfully!'); window.location.href='inventory.php';</script>";
            exit;
        }
    } else {

        $productName = $_POST["name"];
        $quantity = (int)$_POST["quantity"];
        $type = $_POST["type"];

        $productId = null;

        // Find the product ID by name
        foreach ($products as $p) {
            if ($p["name"] === $productName) {
                $productId = $p["_id"];
                break;
            }
        }

        $postData = [
            "productId" => $productId,
            "quantity" => $quantity,
            "type" => $type
        ];

        $options = [
            "http" => [
                "header" => "Content-Type: application/json",
                "method" => "POST",
                "content" => json_encode($postData),
                "ignore_errors" => true
            ],
        ];
        $context = stream_context_create($options);
        $response = file_get_contents("$apiBaseUrl/inventory/transaction", false, $context);
        $responseData = json_decode($response, true);

        if (isset($responseData["error"])) {
            $errorMsg = $responseData["error"];
        } else {
            echo "<script>alert('Transaction added successfully!'); window.location.href='inventory.php';</script>";
            exit;
        }
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Stock & Transactions</title>

    <link rel="stylesheet" href="style.css">

</head>

<body>

    <div class="container">
        <h1>Product Stock</h1>

        <?php if (count($stockList) > 0): ?>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($stockList as $item): ?>
                        <tr>
                            <td><?= htmlspecialchars($item["product"]["name"]) ?></td>
                            <td><?= htmlspecialchars($item["stock"]) ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php else: ?>
            <div class="no-data">No stock data available.</div>
        <?php endif; ?>
        <div class="button_section">
            <button class="toggle-btn" onclick="toggleProductForm()">+ Add New Product</button>
            <button class="toggle-btn" onclick="toggleForm()">+ Add Transaction</button>
        </div>
        <!-- Product form (initially hidden) -->
        <div id="productForm" style="display: none;">
            <form class="productForm" method="POST">
                <input type="hidden" name="formType" value="addProduct" />
                <label>Product Name:</label><br />
                <input type="text" name="productName" required style="width: 100%; padding: 5px; margin-bottom: 10px;" />
                <button type="submit" class="submit-btn">Submit</button>
            </form>
        </div>

        <form method="POST" id="transactionForm">
            <input type="hidden" name="formType" value="addTransaction" />
            <?php if (!empty($errorMsg)): ?>
                <script>
                    alert("<?= addslashes($errorMsg) ?>");
                </script>
            <?php endif; ?>

            <label for="name">Select Product</label>
            <select name="name" required>
                <option value="">-- Choose Product --</option>
                <?php foreach ($products as $product): ?>
                    <option value="<?= htmlspecialchars($product["name"]) ?>">
                        <?= htmlspecialchars($product["name"]) ?>
                    </option>
                <?php endforeach; ?>
            </select>

            <label for="quantity">Quantity</label>
            <input type="number" name="quantity" required placeholder="e.g. 10" min="1">

            <label for="type">Transaction Type</label>
            <select name="type" required>
                <option value="sale">Sale</option>
                <option value="purchase">Purchase</option>
                <option value="return">Return</option>
            </select>

            <button type="submit" class="submit-btn">Submit Transaction</button>
        </form>
    </div>

    <script>
        function toggleForm() {
            document.getElementById("transactionForm").classList.toggle("visible");
        }

        function toggleProductForm() {
            const form = document.getElementById("productForm");
            form.style.display = form.style.display === "none" ? "block" : "none";
        }

        const form = document.querySelector('#transactionForm');
        form.addEventListener('submit', function(e) {
            const quantity = document.querySelector('input[name="quantity"]').value;
            if (quantity < 1) {
                alert('Quantity must be above 0');
                e.preventDefault();
            }
        });
    </script>

</body>

</html>