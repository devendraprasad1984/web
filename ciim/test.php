<?php
//echo password_hash('test', PASSWORD_BCRYPT);
//echo rtrim(strtr(base64_encode('test@gmail.com'), '+/', '-_'), '=');
echo password_verify('test', '$2y$10$iXS6gaC8UaPOxlLwtwIDQ.b7Be13vPlYZdK3VlrFDzK/lY6mVrocy%');
