const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com", // Сервер Outlook для SMTP
  port: 587, // Порт для SMTP сервера Outlook
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

const mailOptions = {
  from: {
    name: "Alexsej",
    address: process.env.USER,
  },
  to: ["user1@gmail.com", "user2@gmail.com", "user3@mail.ru"], // Адреса получателей
  subject: "Головная боль",
  text: "Что лучше всего помогает от головной боли",
  html: `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Помощь от головной боли</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
          }
  
          header, footer {
              background-color: #007bff;
              color: #fff;
              text-align: center;
              padding: 20px 0;
          }
  
          main {
              max-width: 800px;
              margin: 20px auto;
              padding: 0 20px;
          }
  
          section {
              margin-bottom: 30px;
          }
  
          h1, h2 {
              margin-bottom: 10px;
          }
  
          ul {
              padding-left: 20px;
          }
  
          footer {
              position: fixed;
              bottom: 0;
              width: 100%;
          }
  
          /* Медиа запросы для адаптивного дизайна */
          @media only screen and (max-width: 600px) {
              main {
                  padding: 0 10px;
              }
          }
      </style>
  </head>
  <body>
      <header>
          <h1>Помощь от головной боли</h1>
      </header>
      <main>
          <section id="overview">
              <h2>Обзор</h2>
              <p>Головная боль - распространенное состояние, с которым сталкиваются миллионы людей ежедневно. Узнайте, как справиться с этим неприятным ощущением и облегчить свое состояние.</p>
          </section>
          <section id="methods">
              <h2>Методы облегчения головной боли</h2>
              <ul>
                  <li><strong>Отдых и расслабление:</strong> Иногда головная боль вызвана стрессом или усталостью. Попробуйте медитацию, глубокое дыхание или теплые ванны.</li>
                  <li><strong>Пить воду:</strong> Дегидрация может быть причиной головной боли. Пейте достаточное количество воды в течение дня.</li>
                  <li><strong>Обезболивающие:</strong> Прием обезболивающих, таких как парацетамол или ибупрофен, может помочь в некоторых случаях.</li>
                  <li><strong>Холод и тепло:</strong> Применение холодного или теплого компресса может снять напряжение и уменьшить болевые ощущения.</li>
                  <li><strong>Избегание триггеров:</strong> Избегайте известных триггеров головной боли, таких как определенные виды пищи или алкоголь.</li>
              </ul>
          </section>
          <section id="consultation">
              <h2>Консультация врача</h2>
              <p>Если у вас возникают сильные или частые приступы головной боли, обратитесь за консультацией к врачу. Важно получить профессиональное мнение и помощь в диагностике и лечении.</p>
          </section>
      </main>
      <footer>
          <p>&copy; 2024 Помощь от головной боли. Все права защищены.</p>
      </footer>
  </body>
  </html>
  `,
};

const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Письмо отправлено");
  } catch (error) {
    console.log(error);
  }
};

sendMail(transporter, mailOptions);
