# 04 — Sistem Mimarisi (Geçici)

## Durum

Bu belge teknoloji seçimi veya uygulanabilir nihai mimari değildir. Gereksinimler ve veri politikası gözden geçirilene kadar yalnızca mantıksal bileşen sınırlarını ifade eder.

## Önerilen mantıksal akış

```text
Uyumlu kamuya açık arama kaynakları/API'leri / Manuel URL ve notlar
                ↓
Kaynak ve kanıt kaydı
                ↓
Problem hipotezi → Kategori/etiket grubu → Fırsat puanı
                ↓
Çözüm üretimi → Düşük sadakatli demo → Çok senaryolu ROI tahmini
                ↓
Teklife hazır → Kullanıcı onayı/kopyalama → İletişime geçildi kaydı
                ↓
Sonuç kaydı ve öğrenme döngüsü
```

## Mantıksal bileşenler

| Bileşen | Sorumluluk | Kritik sınır |
|---|---|---|
| Araştırma kaydı | Kaynak, gözlem, tarih ve erişim notunu saklar | Kaynak ile yorumu karıştırmaz |
| Keşif girişi | Sektör/konum/anahtar kelime araması veya manuel URL girişi sağlar | Sadece uyumlu kaynak/API; sınırsız tarama yapmaz |
| Kanıt/hipotez değerlendirme | Problem hipotezi, güven derecesi ve belirsizliği tutar | Hipotezi gerçek olarak işaretlemez |
| Etiketleme ve puanlama | Kayıtları kategori/etiketle ilişkilendirir, açıklanabilir sıralama üretir | Rubrik geçicidir; keyfi sabit ağırlık veya özel bütçe çıkarımı kullanmaz |
| Çözüm üretimi | Seçenek, kapsam, risk, bağımlılık ve düşük sadakatli demo fikri oluşturur | Çalışan özel uygulama veya kesin sonuç vaat etmez |
| ROI modeli | Düzenlenebilir girdiler, formül, çoklu senaryo ve hassasiyeti gösterir | Bilinmeyen müşteri girdilerini doğrulama için işaretler |
| Onay kapısı | Taslakları insan incelemesi, onayı veya kopyalamasına bağlar | Mesaj/e-posta göndermez; yalnızca durum kaydeder |
| Öğrenme kaydı | Sonuç, kazanım/kayıp ve geri bildirimi ilişkilendirir | Sonradan denetlenebilir olmalıdır |

## Business Discovery modülü — geçici tasarım

### Sınır ve akış

```text
Arama formu
  (ülke, şehir/bölge, sektör, 5–50 varsayılanı, isteğe bağlı anahtar kelime)
                ↓
Kaynak uygunluk/limit kontrolü ─── uygun değilse ───→ Manuel URL girişi
                ↓
Seçilmiş kamuya açık arama kaynağı/API'si
                ↓
Sonuç normalleştirme ve köken kaydı
                ↓
Yinelenen aday tespiti → Kullanıcı incelemesi
                ↓
Aday işletme profili → Araştırma / problem-analizi devri
```

Modül yalnızca keşif adaylarını ve kamuya açık kökenlerini üretir. Araştırma, problem hipotezi, puanlama ve iletişim sonraki aşamalardır; Business Discovery bunları otomatik doğrulamaz veya başlatmaz.

### Mantıksal sorumluluklar

| Bileşen | Sorumluluk | MVP sınırı |
|---|---|---|
| Arama isteği | Filtreleri doğrular, varsayılan çalışan aralığını uygular ve isteği kaydeder | Sağlayıcıya özgü sorgu dili içermez |
| Kaynak yapılandırması | Sağlayıcının izin verilen sorgu/alanlarını, koşul inceleme durumunu, kota ve maliyet notunu tutar | Sağlayıcı seçimi açık karardır |
| Kaynak bağdaştırıcısı | Onaylı kaynağa/API'ye istek biçimlendirir ve izinli sonuç alanlarını alır | Tarama, sayfa kazıma veya koşul aşma yapmaz |
| Normalleştirici | Sonucu ortak aday alanlarına dönüştürür; eksikleri `bilinmiyor` işaretler | Kaynaktan görünmeyen bilgiyi üretmez |
| Yinelenen denetleyicisi | Harici kimlik, kanonik URL/alan adı veya ad+konumla olası eşleşme üretir | Belirsiz eşleşmeyi otomatik birleştirmez |
| Aday profili ve devir | Kaynakları korunmuş profil, durum ve kullanıcı kararını saklar | Problem/fırsat sonucu çıkarmaz |

### Sağlayıcı değerlendirme gereksinimleri

Sağlayıcı seçilmeden önce yalnızca şu gereksinimler karşılaştırılmalıdır: hedef ülke/konum ve sektör kapsamı; arama/filtre alanları; izin verilen sonuç verisi ve saklama şartları; kimlik doğrulama; kota, hız limiti ve yeniden deneme beklentileri; ücretlendirme/ücretsiz limit; kullanım koşulları ve veri koruma yükümlülükleri. Belirli bir sağlayıcının bu koşulları sağladığı varsayılmaz.

### Veri koruma ve işletim sınırları

- Sadece aday tanımlama ve kaynak gösterimi için gerekli kamuya açık alanlar saklanır; sonuçların ham kopyası, sağlayıcının koşulları gerektirmedikçe tutulmaz.
- Her aday alanı mümkünse kaynak sonucu ve erişim zamanıyla ilişkilendirilir; kaynak kökeni olmayan değer “bilinmiyor” kabul edilir.
- Kota/hız limiti kaynağa göre izlenir; limitte durur, bekler veya kullanıcıya manuel URL seçeneğini sunar. Ücretli kullanım otomatik başlatılmaz.
- Kaynak koşulu, gizlilik veya hukuki inceleme işareti çözülmemişse bağdaştırıcı etkinleştirilmez. Bu mimari değerlendirme hukuki tavsiye değildir.

## Veri sınıfları — taslak

- İşletme profili ve kamuya açık kaynak referansları.
- Kanıt parçaları, problem hipotezleri ve değerlendirme notları.
- Puanlar, küme bağlantıları, çözüm/demo/ROI taslakları.
- İnsan onayları, iletişim taslakları ve sonuç/öğrenme kayıtları.

Kaynak kökeni, kullanım koşulu kontrolü, veri minimizasyonu ve gizlilik/hukuki inceleme işaretleri de izlenmelidir. Bu tasarım notu hukuki tavsiye değildir.

Veri modeli, saklama süresi, erişim kontrolü, yapay zekâ sağlayıcısı ve barındırma kararı henüz açık kararlardır. Yerel-öncelikli (Local-First) yaklaşım değerlendirme seçeneklerinden biridir; seçilmiş mimari değildir.

## Mimari ilkeler

- Kaynak gösterilebilirlik ve karar geçmişi.
- İnsan denetimi ve varsayılan güvenli davranış.
- Modülerlik; araştırma, değerlendirme ve çıktı üretimini birbirinden ayırma.
- Ölçülebilirlik; tahmin ve gerçekleşen sonuçları karşılaştırabilme.

## Açık kararlar

- Yerel mi, bulut mu; hangi veri saklama ve yedekleme yaklaşımı?
- Yerel-öncelikli seçeneğin fayda, sınır ve yedekleme gereksinimleri nelerdir?
- Yapay zekâ model/sağlayıcı tercihi, veri gönderim sınırları ve maliyet limiti?
- Veri alma yöntemi ve kaynak kullanım uyumluluğu?
- Geçici puanlama rubriği ve etiket taksonomisi hangi insan denetim düzeyinde çalışacak?
