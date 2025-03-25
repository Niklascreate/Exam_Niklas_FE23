# Dokumentation av applikationen - LunarChat
## Beskrivning
Denna applikation fungerar på alla skärmstorlekar, men rekommenderas att testas på mobil för bästa upplevelse(375px)

## Testa applikationen direkt

**URL:** [http://lunarchat.s3-website.eu-north-1.amazonaws.com/](http://lunarchat.s3-website.eu-north-1.amazonaws.com/)

Du kan registrera en ny användare – eller logga in med någon av dessa konton:

| Användarnamn     | Lösenord   |
|------------------|------------|
| batman           | kod12345   |
| MuppElon         | kod12345   |
| Donjuan          | kod12345   |
| Nickeboi         | kod12345   |
| Niklas           | kod12345   |
| Lisafisa         | kod12345   |
| Alicesprallis    | kod12345   |

---


## För att klona ner och testa

1. **Klona repot:**

   ```bash
   git clone https://github.com/Niklascreate/Exam_Niklas_FE23.git
   
2. Gå till rootmappen
   ```bash
   cd Exam_Niklas_FE23/frontend

4. Börja med att installera beroenden
   ```bash
   npm install

4. Kör sedan npm run dev för att starta applikationen. Håll in **Ctrl** och klicka på **localhost:** 

5. Fär bästa användarupplevelse testa i 375px.

## Testa via URL
Denna applikation fungerar på alla skärmstorlekar, men rekommenderas att testas på mobil för bästa upplevelse.

---

## Guide för användning

### Allmänt
För att testa applikationen rekommenderas det att ha flera vyer öppna samtidigt. Detta för att man kan skriva meddelanden på "väggen" samt skicka vänförfrågningar till varandra och sidan uppdateras med bilder samt en counter beroende på hur många som är inne.

### Steg-för-steg:

   1. Första sidan du ser är startpage.
      
   3. För att komma vidare, registrera eller logga in med en befintlig användare.

   4. Nu kommer du till landingpage/HEM. Här finns välkomsttext och information om alla funktioner. När man loggar in hamnar man på "En stund i rampljuset".
      
   5. Längst ner i bild har du en navbar där du kan bläddra mellan dom olika sidorna och i headern syns ett lajv-meddelandet som man kan uppdatera genom att trycka på LAJV.

   6. Det finns också en searchbar där man kan söka på alla registrerade användare.
      
   7. VÄNNER: Här kan du se vilka vänner du har samt ta emot vänförfrågninar. Testa att söka på en annan användare och lägg till dom som vän på ikonen " gubbe med ett plux i hörnet ".

   8. VÄGGEN: Här kan du göra inlägg som alla användare ser.
      
   9. CHAT: Här ska man kunna chatta med vänner (fungerar ej).

   10. KRYPIN: Här inne kan du redigera din profilsida. Tryck på pennan för att öppna redigeringsläget och fyll i dina intressen samt en liten text om dig. Du kan också byta profilbild genom att trycka på bilden och ladda upp en egen. Spara genom att trycka på ikonen checkbox.

   11. För att logga ut trycker man på den runda orangea knappen - Lämna .  


---


## Buggar och annat

1. Chatfunktionen fungerar ej.

2. Lajv message går bara att ha ett i taget och alla kan inte se det.
