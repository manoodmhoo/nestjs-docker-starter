# NestJS Starter Project

## 🚀 การติดตั้งและเริ่มใช้งาน

### วิธีที่ 1: รันด้วย Docker (แนะนำ)

1. **โคลนโปรเจค**
   ```bash
   git clone <repository-url>
   cd nestjs-start-project
   ```

2. **สร้างไฟล์ Environment**
   ```bash
   cp .env.example .env
   ```
   
   หรือสร้างไฟล์ `.env` ใหม่และเพิ่มตัวแปรต่อไปนี้:
   ```env
   # Application
   PORT=3000
   NODE_ENV=development
   
   # Database
   DB_HOST=db
   DB_PORT=3306
   DB_USERNAME=nestuser
   DB_PASSWORD=nestpassword
   DB_DATABASE=nestdb
   
   # phpMyAdmin
   PMA_PORT=8080
   
   # JWT (ถ้ามี)
   JWT_SECRET=your-secret-key
   ```

3. **รันโปรเจคด้วย Docker**
   ```bash
   docker-compose up -d
   ```

4. **เข้าถึงแอปพลิเคชัน**
   - API: http://localhost:3000
   - phpMyAdmin: http://localhost:3001
     - Username: `nestuser`
     - Password: `nestpassword`

### วิธีที่ 2: รันแบบ Local Development

1. **โคลนโปรเจค**
   ```bash
   git clone <repository-url>
   cd nestjs-start-project
   ```

2. **ติดตั้ง Dependencies**
   ```bash
   npm install
   ```

3. **ตั้งค่าฐานข้อมูล MySQL**
   - สร้างฐานข้อมูลชื่อ `nestdb`
   - สร้างผู้ใช้ `nestuser` พร้อมรหัสผ่าน `nestpassword`

4. **สร้างไฟล์ Environment**
   ```env
   # Application
   PORT=3000
   NODE_ENV=development
   
   # Database
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=nestuser
   DB_PASSWORD=nestpassword
   DB_DATABASE=nestdb
   
   # JWT (ถ้ามี)
   JWT_SECRET=your-secret-key
   ```

5. **รันแอปพลิเคชัน**
   ```bash
   # Development mode
   npm run start:dev
   
   # Production build
   npm run build
   npm run start:prod
   ```

## 📚 คำสั่งที่สามารถใช้ได้

```bash
# การพัฒนา
npm run start          # รันในโหมด production
npm run start:dev      # รันในโหมด development (auto-reload)
npm run start:debug    # รันในโหมด debug

# การสร้าง build
npm run build          # สร้าง production build

# การจัดรูปแบบโค้ด
npm run format         # จัดรูปแบบโค้ดด้วย Prettier
npm run lint           # ตรวจสอบและแก้ไขโค้ดด้วย ESLint

# การทดสอบ
npm run test           # รันการทดสอบ
npm run test:watch     # รันการทดสอบแบบ watch mode
npm run test:cov       # รันการทดสอบพร้อม coverage report
npm run test:e2e       # รันการทดสอบ End-to-End
```

## 🐳 คำสั่ง Docker

```bash
# สร้างและรัน containers
docker-compose up -d

# ดู logs
docker-compose logs -f

# หยุด containers
docker-compose down

# รีบิลด์ images
docker-compose up --build -d

# เข้าไปใน container
docker-compose exec app sh
```

## 📁 โครงสร้างโปรเจค

```
nestjs-start-project/
├── src/                     # โค้ดหลักของแอปพลิเคชัน
│   ├── app.controller.ts    # Controller หลัก
│   ├── app.module.ts        # Module หลัก
│   ├── app.service.ts       # Service หลัก
│   └── main.ts             # Entry point ของแอปพลิเคชัน
├── test/                    # การทดสอบ End-to-End
├── docker-compose.yml       # การตั้งค่า Docker Compose
├── Dockerfile              # การตั้งค่า Docker
├── package.json            # Dependencies และ scripts
├── tsconfig.json           # การตั้งค่า TypeScript
└── .env                    # ตัวแปร Environment
```

## 🗄️ การจัดการฐานข้อมูล

### ผ่าน phpMyAdmin (สำหรับ Docker)
1. เข้าไปที่ http://localhost:3001
2. Login ด้วย:
   - Server: `db`
   - Username: `root`
   - Password: `rootpassword`

### ผ่าน Command Line
```bash
# เข้าไปใน MySQL container
docker-compose exec db mysql -u root -p

# หรือ connect จาก local
mysql -h localhost -P 3306 -u nestuser -p nestdb
```

## 🧪 การทดสอบ

```bash
# Unit Tests
npm run test

# การทดสอบแบบ watch mode
npm run test:watch

# การทดสอบพร้อม coverage
npm run test:cov

# End-to-End Tests
npm run test:e2e
```

## 🔧 การแก้ไขปัญหาที่พบบ่อย

### 1. Port ถูกใช้งานอยู่แล้ว
```bash
# หาและ kill process ที่ใช้ port 3000
lsof -ti:3000 | xargs kill -9

# หรือเปลี่ยน PORT ใน .env file
PORT=3001
```

### 2. ปัญหาการเชื่อมต่อฐานข้อมูล
```bash
# ตรวจสอบว่า MySQL container รันอยู่หรือไม่
docker-compose ps

# รีสตาร์ท database container
docker-compose restart db
```

### 3. ปัญหา Permission ใน Docker
```bash
# เปลี่ยน owner ของไฟล์
sudo chown -R $USER:$USER .

# หรือรัน Docker ด้วย sudo
sudo docker-compose up -d
```

