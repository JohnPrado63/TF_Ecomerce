<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pago Confirmado</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; background-color: #0f172a; color: #ffffff; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; padding: 30px 0; border-bottom: 1px solid #1e293b; }
        .logo { font-size: 28px; font-weight: 900; color: #06b6d4; }
        .badge { display: inline-block; background: #22c55e; color: #0f172a; font-weight: 700; padding: 6px 16px; border-radius: 999px; font-size: 12px; margin-top: 12px; }
        .content { padding: 32px 0; }
        .greeting { font-size: 22px; font-weight: 700; margin-bottom: 8px; }
        .subtitle { color: #94a3b8; font-size: 14px; margin-bottom: 28px; }
        .card { background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 24px; margin-bottom: 20px; }
        .card-title { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
        .package-name { font-size: 20px; font-weight: 700; color: #06b6d4; margin-bottom: 4px; }
        .package-location { color: #94a3b8; font-size: 13px; }
        .detail-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #334155; }
        .detail-row:last-child { border-bottom: none; }
        .detail-label { color: #94a3b8; font-size: 13px; }
        .detail-value { font-weight: 600; font-size: 13px; }
        .total-row { display: flex; justify-content: space-between; align-items: center; padding: 16px 0 0; }
        .total-label { font-size: 16px; font-weight: 700; }
        .total-value { font-size: 24px; font-weight: 900; color: #22c55e; }
        .success-box { background: #052e16; border: 1px solid #166534; border-radius: 12px; padding: 16px; margin-bottom: 20px; }
        .success-text { color: #86efac; font-size: 14px; line-height: 1.6; }
        .order-box { background: #0c1a2e; border: 2px solid #06b6d4; border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 20px; }
        .order-label { color: #64748b; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px; }
        .order-number { color: #06b6d4; font-size: 28px; font-weight: 900; letter-spacing: 4px; }
        .btn { display: block; text-align: center; background: #06b6d4; color: #0f172a; font-weight: 700; padding: 14px 24px; border-radius: 12px; text-decoration: none; font-size: 15px; margin: 24px 0; }
        .footer { text-align: center; padding-top: 24px; border-top: 1px solid #1e293b; color: #475569; font-size: 12px; }
        .footer-logo { font-size: 16px; font-weight: 900; color: #06b6d4; margin-bottom: 8px; }
    </style>
</head>
<body>
    <div class="container">

        <!-- Header -->
        <div class="header">
            <div class="logo">ESKY TRIPS</div>
            <div class="badge">✅ Pago Confirmado</div>
        </div>

        <!-- Contenido -->
        <div class="content">
            <p class="greeting">¡Hola, {{ $payment->booking->client->first_name }}! 🎉</p>
            <p class="subtitle">Tu pago fue verificado y tu reserva está completamente confirmada.</p>

            <!-- Caja de éxito -->
            <div class="success-box">
                <p class="success-text">
                    🎊 <strong>¡Todo listo para tu viaje!</strong> Tu reserva ha sido confirmada exitosamente. Prepárate para vivir una experiencia increíble en Ayacucho.
                </p>
            </div>

            <!-- Número de orden -->
            <div class="order-box">
                <p class="order-label">Número de orden</p>
                <p class="order-number">{{ $payment->booking->order_number }}</p>
            </div>

            <!-- Info del paquete -->
            <div class="card">
                <p class="card-title">Paquete confirmado</p>
                <p class="package-name">{{ $payment->booking->tourPackage->title }}</p>
                <p class="package-location">📍 {{ $payment->booking->tourPackage->location->city }}, {{ $payment->booking->tourPackage->location->region }}</p>
            </div>

            <!-- Detalles -->
            <div class="card">
                <p class="card-title">Detalles del viaje</p>
                <div class="detail-row">
                    <span class="detail-label">📅 Fecha de viaje</span>
                    <span class="detail-value">{{ $payment->booking->booking_date }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">👥 Personas</span>
                    <span class="detail-value">{{ $payment->booking->persons_quantity }} persona(s)</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">💳 Método de pago</span>
                    <span class="detail-value">{{ ucfirst($payment->method) }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">📋 Estado</span>
                    <span class="detail-value" style="color: #22c55e;">✅ Confirmado</span>
                </div>
                <div class="total-row">
                    <span class="total-label">Total pagado</span>
                    <span class="total-value">S/. {{ number_format($payment->amount, 2) }}</span>
                </div>
            </div>

            <!-- Botón -->
            <a href="{{ config('app.url') }}/bookings" class="btn">
                Ver mis reservas →
            </a>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="footer-logo">ESKY TRIPS</div>
            <p>¡Gracias por confiar en nosotros! 🏔️</p>
            <p style="margin-top: 8px;">© 2026 ESKY TRIPS. Todos los derechos reservados.</p>
        </div>

    </div>
</body>
</html>