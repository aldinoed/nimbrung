<?php
$host = "localhost";
$user = "root";
$pass = "mydata";
$db = "tbpesan";
$conn = mysqli_connect($host, $user, $pass, $db);
if ($conn->connect_error) {
      trigger_error('koneksi ke database gagal:' . $conn->connect_error, E_USER_ERROR);
} else {
      if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $nama = $_POST['txtnama'];
            $email = $_POST['txtemail'];
            $nohp = $_POST['txtnohp'];
            $pesan = $_POST['txtpesan'];
            if (!empty($nama)) {
                  $sqltr = "insert into tbpesan(nama, email, nohp,pesan) values('$nama','$email','$nohp','$pesan')";
                  if ($conn->query($sqltr) === false) {
                        trigger_error('Perintah SQL Salah:' . $sqtr . 'Eror:' . $conn->error, E_USER_ERROR);
                  } else {
                        echo "<b>Inilah data-data yang anda simpan:</b>";
                        echo "<br>";
                        echo "<hr>";
                        echo "<br>";
                        echo "Nama:$_POST[txtnama]";
                        echo "<br>";
                        echo "Email:$_POST[txtemail]";
                        echo "<br>";
                        echo "No Hp:$_POST[txtnohp]";
                        echo "<br>";
                        echo "Pesan:$_POST[txtpesan]";
                        echo "<hr>";
                        echo "Data berhasil disimpan ke database!";
                        echo "<P><a> href='formpesan.php'>Pesan Lagi.?</a><p/>";
                  }
            }
      }
}
?>
</body>

</html>