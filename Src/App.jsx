import { useState } from 'react';
import './index.css';

const sorular = [
  // Ekonomik Eksen (Sol: -2, Sağ: +2)
  { id: 1, text: "Devletin ekonomideki rolü büyük olmalı ve temel hizmetler kamulaştırılmalıdır.", eksen: "economic" },
  { id: 2, text: "Vergiler düşük olmalı ve bireyler kendi gelirleriyle özgürce tasarruf edebilmelidir.", eksen: "economic" },
  { id: 3, text: "Gelir eşitsizliğini azaltmak için zenginlerden daha fazla vergi alınmalıdır.", eksen: "economic" },
  { id: 4, text: "Piyasa ekonomisi, devletin müdahalesi olmadan daha verimlidir.", eksen: "economic" },
  // Toplumsal Eksen (Liberal: -2, Muhafazakar: +2)
  { id: 5, text: "Bireyler, toplumsal normlara uymadan özgürce yaşam tarzlarını seçebilmelidir.", eksen: "social" },
  { id: 6, text: "Geleneksel aile yapısı toplumun temel taşıdır ve korunmalıdır.", eksen: "social" },
  { id: 7, text: "Eşcinsel evlilikler yasal olmalı ve eşit haklar tanınmalıdır.", eksen: "social" },
  { id: 8, text: "Toplumun ahlaki değerleri devlet tarafından korunmalıdır.", eksen: "social" },
  // Otorite Eksen (Liberal/Anarşist: -2, Otoriter: +2)
  { id: 9, text: "Devletin bireylerin hayatına müdahalesi minimum olmalıdır.", eksen: "authority" },
  { id: 10, text: "Güvenlik için devlet bireylerin iletişimini izleyebilir.", eksen: "authority" },
  { id: 11, text: "Hükümet, toplumsal düzeni sağlamak için güçlü bir otoriteye sahip olmalıdır.", eksen: "authority" },
  { id: 12, text: "Bireysel özgürlükler, devlet kontrolünden daha önemlidir.", eksen: "authority" },
  // Kimlik Eksen (Kapsayıcı: -2, Milliyetçi: +2)
  { id: 13, text: "Türkiye’de herkes, etnik kökenine bakılmaksızın eşit haklara sahip olmalıdır.", eksen: "identity" },
  { id: 14, text: "Milli kimlik, toplumsal birlik için önceliklidir.", eksen: "identity" },
  { id: 15, text: "Göçmenler, Türkiye’nin kültürel yapısını tehdit edebilir.", eksen: "identity" },
  { id: 16, text: "Çok kültürlülük, toplumun zenginliğini artırır.", eksen: "identity" },
  // Sistem Karşıtlığı Eksen (Sistem Karşıtı: -2, Sistem Yanlısı: +2)
  { id: 17, text: "Mevcut siyasi sistem köklü bir değişime ihtiyaç duyar.", eksen: "antiEstablishment" },
  { id: 18, text: "Devletin kurumlarına güvenmek, toplumsal istikrar için önemlidir.", eksen: "antiEstablishment" },
  { id: 19, text: "Siyasi elitler, halkın çıkarlarını değil kendi çıkarlarını temsil eder.", eksen: "antiEstablishment" },
  { id: 20, text: "Mevcut düzen, genel olarak adil ve işlevseldir.", eksen: "antiEstablishment" },
];

const secenekler = [
  { text: "Kesinlikle Katılmıyorum", value: -2 },
  { text: "Katılmıyorum", value: -1 },
  { text: "Kararsızım", value: 0 },
  { text: "Katılıyorum", value: 1 },
  { text: "Kesinlikle Katılıyorum", value: 2 },
];

const App = () => {
  const [cevaplar, setCevaplar] = useState({});
  const [sonuclariGoster, setSonuclariGoster] = useState(false);

  const cevapVer = (soruId, deger) => {
    setCevaplar((onceki) => ({ ...onceki, [soruId]: deger }));
  };

  const sonuclariHesapla = () => {
    const eksenler = {
      economic: 0,
      social: 0,
      authority: 0,
      identity: 0,
      antiEstablishment: 0,
    };

    Object.entries(cevaplar).forEach(([soruId, deger]) => {
      const soru = sorular.find((s) => s.id === parseInt(soruId));
      if (soru) {
        eksenler[soru.eksen] += deger;
      }
    });

    Object.keys(eksenler).forEach((eksen) => {
      eksenler[eksen] = eksenler[eksen] / 4;
    });

    return eksenler;
  };

  const politikKonumAl = (eksenler) => {
    const ekonomikEtiket = eksenler.economic < 0 ? "Sol" : "Sağ";
    const toplumsalEtiket = eksenler.social < 0 ? "Liberal" : "Muhafazakar";
    const otoriteEtiket = eksenler.authority < 0 ? "Liberal/Anarşist" : "Otoriter";
    return `${ekonomikEtiket}-${toplumsalEtiket}-${otoriteEtiket}`;
  };

  const partiOnerileriAl = (eksenler) => {
    const oneriler = [];

    if (eksenler.economic < -0.5 && eksenler.social < -0.5 && eksenler.authority < -0.5) {
      oneriler.push("TİP", "YSP");
    } else if (eksenler.economic < -0.5 && eksenler.social < -0.5) {
      oneriler.push("CHP", "YSP");
    } else if (eksenler.economic > 0.5 && eksenler.social > 0.5 && eksenler.authority > 0.5) {
      oneriler.push("AK Parti", "MHP");
    } else if (eksenler.economic > 0.5 && eksenler.identity > 0.5) {
      oneriler.push("Zafer Partisi", "MHP");
    } else if (eksenler.economic < -0.5 && eksenler.authority > 0.5) {
      oneriler.push("CHP", "Memleket Partisi");
    } else {
      oneriler.push("İyi Parti", "DEVA");
    }

    return oneriler;
  };

  const gonder = () => {
    if (Object.keys(cevaplar).length === sorular.length) {
      setSonuclariGoster(true);
    } else {
      alert("Lütfen tüm soruları cevaplayın!");
    }
  };

  const testiSifirla = () => {
    setCevaplar({});
    setSonuclariGoster(false);
  };

  const sonuclariPaylas = () => {
    const eksenler = sonuclariHesapla();
    const konum = politikKonumAl(eksenler);
    const partiler = partiOnerileriAl(eksenler).join(", ");
    const paylasimMetni = `Türkiye Politik Test sonucum: ${konum}. Önerilen partiler: ${partiler}. Testi sen de çöz!`;
    if (navigator.share) {
      navigator.share({
        title: "Türkiye Politik Test Sonuçlarım",
        text: paylasimMetni,
        url: window.location.href,
      });
    } else {
      prompt("Sonuçlarınızı paylaşmak için bu metni kopyalayın:", paylasimMetni);
    }
  };

  if (sonuclariGoster) {
    const eksenler = sonuclariHesapla();
    const konum = politikKonumAl(eksenler);
    const partiler = partiOnerileriAl(eksenler);

    return (
      <div className="container">
        <h1>Sonuçlarınız</h1>
        <div className="result">
          <h2>Politik Konumunuz: {konum}</h2>
          <p>Önerilen Partiler: {partiler.join(", ")}</p>
          <div className="axes">
            <p>Ekonomik Eksen: {eksenler.economic.toFixed(2)}</p>
            <p>Toplumsal Eksen: {eksenler.social.toFixed(2)}</p>
            <p>Otorite Eksen: {eksenler.authority.toFixed(2)}</p>
            <p>Kimlik Eksen: {eksenler.identity.toFixed(2)}</p>
            <p>Sistem Karşıtlığı: {eksenler.antiEstablishment.toFixed(2)}</p>
          </div>
        </div>
        <button onClick={testiSifirla}>Testi Yeniden Çöz</button>
        <button onClick={sonuclariPaylas}>Sonuçları Paylaş</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Türkiye Politik Test</h1>
      <p>18-28 yaş arası gençlere yönelik bu test, politik konumunuzu belirlemek ve size uygun partileri önermek için tasarlandı. Lütfen tüm soruları cevaplayın.</p>
      {sorular.map((soru) => (
        <div key={soru.id} className="question">
          <p>{soru.id}. {soru.text}</p>
          <div className="options">
            {secenekler.map((secenek) => (
              <label key={secenek.value}>
                <input
                  type="radio"
                  name={`soru-${soru.id}`}
                  value={secenek.value}
                  checked={cevaplar[soru.id] === secenek.value}
                  onChange={() => cevapVer(soru.id, secenek.value)}
                />
                {secenek.text}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button onClick={gonder}>Sonuçları Göster</button>
    </div>
  );
};

export default App;
