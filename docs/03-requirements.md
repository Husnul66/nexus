# 03 — Gereksinimler

## Kullanıcı ve sınır

Birincil kullanıcı proje sahibidir. Sürüm 1.0 dahili, tek kullanıcılı kişisel araç varsayımıyla planlanır; çok kiracılı SaaS, müşteri portalı ve otomatik dış iletişim kapsam dışıdır.

## İşlevsel gereksinim taslağı

| ID | Gereksinim | Durum |
|---|---|---|
| FR-01 | Sektör, konum ve anahtar kelimeye göre uyumlu kamuya açık arama kaynağı/API üzerinden işletme keşfi yapabilme; manuel URL girişi sunabilme | Taslak |
| FR-01a | Kaynak, tarih, gözlem ve yorum ayrımıyla işletme/fırsat kaydı oluşturabilme | Taslak |
| FR-02 | Problem hipotezini kanıt gücü ve belirsizlikle kaydedebilme | Taslak |
| FR-03 | Benzer problem hipotezlerini insanın inceleyebileceği basit kategori/etiket gruplarında gösterebilme | MVP taslağı |
| FR-04 | Fırsatları kanıt kalitesi ile gerekçeleri görünür olan geçici rubrikle puanlayıp sıralayabilme | Taslak |
| FR-05 | Çözüm seçenekleri, varsayımlar, bağımlılıklar ve risklerle mimari öneri oluşturabilme | Taslak |
| FR-06 | Geliştirme öncesi düşük sadakatli görsel kavram ve kullanıcı akışı üretebilme | MVP taslağı |
| FR-07 | ROI tahmininde düzenlenebilir girdileri, formülü, çoklu senaryoyu, aralığı ve belirsizliği gösterebilme; bilinmeyen müşteri girdilerini doğrulama için işaretleyebilme | Taslak |
| FR-08 | Fırsat sonucu ve öğrenimleri kaydedip sonraki değerlendirmelerde kullanılabilir kılma | Taslak |
| FR-09 | Pazar/ülke/sektör araştırma kayıtlarını karşılaştırılabilir biçimde tutabilme | Taslak |
| FR-10 | Satış desteği için kanıt özeti ve kullanıcı tarafından gözden geçirilebilen/kopyalanabilen iletişim taslağı üretebilme | Taslak |
| FR-11 | Harici iletişim veya dış sistemde değişiklik öncesinde açık insan onayı isteme ve kaydetme | Zorunlu |

## Business Discovery MVP tasarımı

### Arama isteği ve kullanıcı akışı

1. Kullanıcı ülke, şehir/bölge, sektör, çalışan aralığı ve isteğe bağlı anahtar kelimeleri girer. Çalışan aralığı varsayılan olarak `5–50` gelir; bilinmiyorsa kullanıcı bu alanı boş bırakabilir.
2. Nexus, seçilmiş ve kullanım koşulları uygunluğu incelenmiş kamuya açık arama kaynağı/API'sine yapılandırılmış isteği gönderir. Kaynak kullanılamazsa veya kullanıcı tercih ederse manuel URL girişi sunar.
3. Dönen sonuçlar normalize edilir, kaynak kökeni kaydedilir ve yinelenen adaylar birleştirilir.
4. Kullanıcı aday listesini inceler, her adayın hangi alanının kaynakta doğrudan görüldüğünü ve hangisinin eksik olduğunu görür.
5. Kullanıcı bir adayı Business Discovery kaydına alır ya da eler. Kayda alınan aday, sonraki araştırma/problem-analizi aşamasına devredilmeye hazır olur; bu adım problem veya fırsat doğrulaması değildir.

### Arama ve aday veri alanları

| Kayıt | Asgari alanlar |
|---|---|
| Arama isteği | İstek kimliği, ülke, şehir/bölge, sektör, çalışan aralığı, anahtar kelimeler, oluşturulma zamanı, seçilen kaynak yapılandırması |
| Kaynak sonucu | Kaynak türü/sağlayıcı kimliği, sonuç URL'si, sağlayıcının izin verdiği harici kimlik varsa bu kimlik, erişim zamanı, sonuçta görünen ad ve ham alanların sınırlı özeti |
| Aday işletme | Görünen ad, kanonik web alan adı/URL varsa, ülke, şehir/bölge, sektör etiketi, çalışan aralığı/göstergesi varsa, eksik alan işaretleri, durum (`yeni`, `inceleniyor`, `araştırmaya devredildi`, `elendi`) |
| Köken ve karar | Kaynak sonucu bağlantısı, normalleştirme tarihi, birleştirme gerekçesi, kullanıcı kararı ve notu |

Çalışan sayısı veya aralığı kaynakta açıkça yoksa “bilinmiyor” tutulur. Kamuya açık sinyalden özel bütçe, özel erişim veya kesin çalışan sayısı çıkarılmaz.

### Yinelenen aday yönetimi

- Önce sağlayıcının izin verdiği kalıcı harici kimlik varsa, yoksa kanonik alan adı/URL; bunlar yoksa normalleştirilmiş ad + konum karşılaştırılır.
- Olası eşleşmeler otomatik olarak tek bir aday altında kaynaklarıyla gösterilir; güven düşükse kullanıcıya birleştirme veya ayrı tutma seçeneği verilir.
- Birleştirme, kaynak kayıtlarını silmez; adayda tüm kaynak bağlantıları ve karar gerekçesi korunur.

### Hata ve boş durumlar

- Zorunlu ülke, şehir/bölge veya sektör alanı yoksa arama başlatılmaz; eksik alan gösterilir.
- Sonuç yoksa kriterleri genişletme, anahtar kelimeyi değiştirme veya manuel URL girme önerilir; sonuç yokluğu işletme bulunmadığı iddiası değildir.
- Kaynak/API yetkilendirme, kota, zaman aşımı veya geçici hata verirse hata türü ve yeniden deneme zamanı gösterilir; varsa manuel URL girişi kullanılabilir.
- Kaynak kullanım koşulu belirsiz veya onaysızsa arama devre dışı kalır; kullanıcıya nedeni ve sağlayıcı seçimi gereksinimi gösterilir.

### Kabul ölçütleri — Business Discovery

- Kullanıcı varsayılan `5–50` çalışan aralığıyla ülke, şehir/bölge ve sektör girerek arama isteği hazırlayabilir; anahtar kelime isteğe bağlıdır.
- Uyumlu bir kaynak yapılandırıldığında sonuçlar aday listesinde, her satırın kaynağı ve erişim zamanıyla görünür.
- Aynı işletmeye ait görünen sonuçlar kaynaklarını koruyarak tek aday altında gösterilir; belirsiz eşleşme kullanıcı kararı bekler.
- Kullanıcı manuel URL'den aday oluşturabilir ve bunu sonraki araştırma/problem-analizi aşamasına devredebilir.
- Boş sonuç, kota/hata ve kaynak uygunluğu durumları açıkça ayırt edilir; sistem sınırsız tarama yapmaz.
- Arama, aday oluşturma veya devir adımı dış iletişim başlatmaz ve müşteri problemi doğrulaması iddia etmez.

## İşlevsel olmayan gereksinim taslağı

Ek MVP gereksinimleri:

- FR-12: Fırsat durumlarını keşfedilen sinyal, problem hipotezi, puanlandı, teklife hazır, kullanıcı onayladı, iletişime geçildi ve sonuç kaydedildi olarak izleyebilmelidir.
- FR-13: Kullanıcının iletişim taslağı için onayını veya kopyalama eylemini kaydedebilmeli; mesaj/e-posta dahil otomatik dış iletişim göndermemelidir.

- İzlenebilirlik: Her önemli çıktı kaynağına, sürümüne ve varsayımlarına bağlanabilmelidir.
- Açıklanabilirlik: Puan, küme, öneri ve ROI sonucu gerekçeleriyle görünmelidir.
- Puanlama disiplini: Kanıt kalitesi ve puan gerekçesi görünür olmalı; rubrik geçici kabul edilmeli, keyfi sabit ağırlıklar kullanılmamalı ve kamuya açık veriden özel bütçe/erişim gerçekmiş gibi çıkarılmamalıdır.
- Gizlilik: Gereksiz kişisel veri toplanmamalı; erişim ve saklama sınırları belirlenmelidir.
- Veri minimizasyonu ve kaynak kökeni: Yalnızca amaç için gerekli veri tutulmalı; her veri parçasının kaynak URL'si, erişim tarihi ve kullanım bağlamı izlenmelidir.
- Uyumluluk: Kaynak kullanım koşulları kontrol edilmeli; gizlilik/hukuki inceleme gerektiren durumlar işaretlenmelidir. Bu gereksinim hukuki tavsiye değildir.
- Oran/kota ve maliyet kontrolü: Sağlayıcı bazında istek kotası, bekleme/yeniden deneme davranışı ve ücretli kullanım riski görünür olmalıdır. Kullanıcı onayı olmadan ücret doğuracak kullanım başlatılmamalıdır.
- Güvenlik: Dış eylemler varsayılan olarak kapalı olmalı ve onay kaydı gerektirmelidir.
- Kullanılabilirlik: Tek kullanıcının araştırma → inceleme → karar akışı gereksiz karmaşıklık olmadan tamamlanmalıdır.

## Kabul ölçütleri — taslak

Bir fırsat kaydı; en az bir kaynak, erişim tarihi, ayrı gözlem/yorum alanı, kanıt derecesi ve insan karar durumu olmadan "incelemeye hazır" sayılamaz. Bu eşiğin ayrıntıları açık karardır.

## Kapsam dışı (v1.0 önerisi)

- Onaysız e-posta/mesaj gönderimi ve otomatik müşteri teması.
- Sınırsız veya kaynak koşullarını aşan web taraması.
- Anlamsal/vektör tabanlı kümeleme.
- Müşteri ilgisi öncesinde çalışan özel uygulama demosu geliştirme.
- Doğrulanmamış sinyalleri kesin müşteri problemi olarak sunma.
- Çok müşterili ticari platform işletimi.

## Açık kararlar

- İlk sürümde hangi veri girişleri manuel, hangileri yarı otomatik olacak?
- İnsan onayının biçimi ve denetlenebilir kaydı nasıl tasarlanacak?
- Demo çıktısının hedef formatı nedir?
- ROI'nin hangi maliyet ve fayda kalemleri zorunlu olacak?
- Uyumlu arama kaynakları/API'leri hangileridir; kullanım limitleri ve koşulları nedir?
- Business Discovery için hangi kaynakların ülke, konum, sektör ve çalışan aralığı filtrelerini gerçekten desteklediği; maliyet ve kota sınırları nedir?
- Kanıt kalitesi ve puanlama rubriği hangi insan inceleme kuralıyla onaylanacak?
