module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_TOKEN: process.env.API_TOKEN,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "https://www.clearcreekbroadband.com",
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://ltwztpwyptrgku:fc9a4b4690ef9338e4ee7399429f61e7e6fae63e46afce54399d1bcdbdf34a95@ec2-34-200-72-77.compute-1.amazonaws.com:5432/dd4kdf9bgns2vh',
  TEST_DATABASE_URL:process.env.TEST_DATABASE_URL || 'postgresql://MelanieLee@localhost/contacts-test'
}
