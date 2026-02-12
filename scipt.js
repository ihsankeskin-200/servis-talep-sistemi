// Telefon numarası ve WhatsApp numaranızı buraya yazın
const TELEFON = "905454071440"; // Aranan numarası (+90 kodu olmadan)
const WHATSAPP = "905551234567"; // WhatsApp numarası (+90 kodu olmadan)

// Sayfa yüklendiğinde talepler listesini göster
document.addEventListener('DOMContentLoaded', function() {
    displayTalepler();
    updateContactLinks();
});

// Form gönderme işlemi
document.getElementById('talepForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Form verilerini al
    const talep = {
        id: Date.now(),
        ad: document.getElementById('ad').value,
        telefon: document.getElementById('telefon').value,
        email: document.getElementById('email').value,
        hizmet: document.getElementById('hizmet').value,
        aciklama: document.getElementById('aciklama').value,
        tarih: document.getElementById('tarih').value,
        olusturulma: new Date().toLocaleDateString('tr-TR')
    };

    // localStorage'a kaydet
    let talepler = JSON.parse(localStorage.getItem('talepler')) || [];
    talepler.push(talep);
    localStorage.setItem('talepler', JSON.stringify(talepler));

    // Formu temizle
    this.reset();

    // Başarı mesajı göster
    showMessage('Servis talebiniz başarıyla oluşturuldu! En kısa sürede sizinle iletişime geçeceğiz.', 'success');

    // Talepler listesini güncelle
    displayTalepler();

    // Sayfayı talepler kısmına kaydır
    setTimeout(() => {
        document.getElementById('talepler').scrollIntoView({ behavior: 'smooth' });
    }, 500);
});

// Talepler listesini görüntüle
function displayTalepler() {
    const talepleriDiv = document.getElementById('talepler');
    let talepler = JSON.parse(localStorage.getItem('talepler')) || [];

    // Talepler ters sırada göster (en yeni en üstte)
    talepler = talepler.reverse();

    if (talepler.length === 0) {
        talepleriDiv.innerHTML = '<p style="text-align: center; color: #999;">Henüz talep bulunmamaktadır.</p>';
        return;
    }

    let html = '';
    talepler.forEach(talep => {
        const hizmetAdi = getHizmetAdi(talep.hizmet);
        html += `
            <div class="talep-card">
                <h4>👤 ${talep.ad}</h4>
                <p><strong>Hizmet:</strong> ${hizmetAdi}</p>
                <p><strong>Telefon:</strong> <a href="tel:${talep.telefon}" style="color: var(--primary-color); text-decoration: none;">${talep.telefon}</a></p>
                <p><strong>E-mail:</strong> ${talep.email}</p>
                <p><strong>Sorun:</strong> ${talep.aciklama}</p>
                <p><strong>Tercih Edilen Tarih:</strong> ${talep.tarih}</p>
                <p><strong>Talep Tarihi:</strong> ${talep.olusturulma}</p>
                <span class="badge">${hizmetAdi}</span>
            </div>
        `;
    });

    talepleriDiv.innerHTML = html;
}

// Hizmet adını döndür
function getHizmetAdi(kod) {
    const hizmetler = {
        'kombi': '🔥 Kombi Servisi',
        'klima': '❄️ Klima Servisi',
        'beyaz-esya': '🌊 Beyaz Eşya Servisi'
    };
    return hizmetler[kod] || kod;
}

// İletişim linklerini güncelle
function updateContactLinks() {
    // Telefon linki
    const telefonLinks = document.querySelectorAll('a[href^="tel:"]');
    telefonLinks.forEach(link => {
        if (link.textContent.includes('Ara')) {
            link.href = `tel:+${TELEFON}`;
        }
    });

    // WhatsApp linki
    const whatsappLink = document.querySelector('a[href^="https://wa.me/"]');
    if (whatsappLink) {
        whatsappLink.href = `https://wa.me/${WHATSAPP}`;
    }
}

// Başarı/Hata mesajı göster
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 5px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease-in-out;
        background-color: ${type === 'success' ? '#28a745' : '#dc3545'};
    `;
    messageDiv.text`
