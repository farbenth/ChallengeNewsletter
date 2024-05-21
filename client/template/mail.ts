export const mail = `<table style="background-color: #f9f9fb; width: 100%;" border="0">
<tr>
  <td align="center">
    <table border="0" width="100%" style="max-width: 660px; width: 100%; background-color: #0b132c; border: 2px solid #eee; border-radius: 8px 8px 0 0; overflow: hidden" cellpadding="0" cellspacing="0">
      <tr>

        <td style="padding: 32px 8px 16px 64px;" width="50%">
          <img src="https://s4-recruiting.cdn.greenhouse.io/external_greenhouse_job_boards/logos/400/579/700/resized/Stori_Logo_Primary.png" alt="Logo Storicard" class="tiny-logo" width="120">
          <div class="tiny-editable" style="font-family: 'helvetica', sans-serif; color: #fff; font-size: 16px; line-height: 1.5;">
            <h1>Test Newsletter</h1>
          </div>
        </td>
      </tr>
    </table>
    <table border="0" width="100%" style="max-width: 660px; width: 100%; background-color: #ffffff; border: 2px solid #eee; border-radius: 8px; overflow: hidden" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding: 16px 64px 0;" colspan="2">
          <div class="tiny-editable" style="font-family: 'helvetica', sans-serif; color: #243376;">
            <p style="font-size: 20px; text-align: center;">Hola {{email}},</p>
            <p style="font-size: 20px; text-align: center;">Prueba del newsletter</p>
          </div>
        </td>
      </tr>
      <tr>
          <td style="background-color: #eff0f6; padding: 24px 64px;" colspan="2">
            <p style="margin: 0; font-family: 'helvetica'; font-size: 12px; color: #a0a9c5;"><a href="http://localhost:3000/subscriptions?email={{email}}" style="color: #a0a9c5;">Actualiza tus suscripciones</a>.</p>
          </td>
        </tr>
      </table>
  </td>
</tr>
</table>
`;
