# Campaign Management System

Bu proje, kampanyaların yönetilmesini sağlayan bir web uygulamasıdır. Kullanıcılar kampanya ekleyebilir, düzenleyebilir, silebilir ve listeleyebilir.

## Özellikler

- Kullanıcı girişi
- Kampanya ekleme
- Kampanya düzenleme
- Kampanya silme
- Kampanya listeleme
- Kampanyaları puana ve tarihe göre sıralama
- Responsive tasarım
- Dark/Light tema desteği

## Teknolojiler

- Angular 19
- TypeScript
- SCSS
- NgBootstrap
- Font Awesome

## Kurulum

1. Projeyi klonlayın:
bash
git clone [repo-url]

2. Proje dizinine gidin:
bash
cd campaign-management

3. Bağımlılıkları yükleyin:
bash
npm install

4. Uygulamayı başlatın:
bash
ng serve

5. Tarayıcınızda aşağıdaki adresi açın:
bash
http://localhost:4200

## Giriş Bilgileri

Kullanıcı adı: `admin`  
Şifre: `admin123`

## Proje Yapısı

```
src/
├── app/
│   ├── core/
│   │   └── models/        # Interface tanımlamaları
│   ├── pages/
│   │   ├── campaigns/     # Kampanya yönetimi
│   │   └── login/         # Giriş sayfası
│   ├── shared/
│   │   └── components/    # Ortak kullanılan componentler
│   └── styles/           # Global stil dosyaları
└── assets/              # Resimler ve diğer statik dosyalar
```
