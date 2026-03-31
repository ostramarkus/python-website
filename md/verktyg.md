# Utvecklingsmiljö och verktyg

## **Utvecklingsmiljöer**

Det finns tre huvudsakliga sätt att programmera Python:

1. Online med enklare webbtjänster  
2. Offline på traditionell PC  
3. Online med mer avancerade tjänster

### **Online med enklare webbtjänster**

Det här är det enklaste sättet att komma igång med Python. Det finns många olika webbtjänster där man kan koda Python utan att behöva skapa ett konto eller installera något. Några exempel:

* [Trinket.io](https://trinket.io/python3)  
* [Programiz \- Online Python Compiler (Interpreter)](https://www.programiz.com/python-programming/online-compiler/)  
* [Python Online Compiler & Interpreter](https://onecompiler.com/python)

### **Offline på traditionell PC (Windows, Mac och Linux)**

Det traditionella sättet att programmera Python är att installera Python på sin dator och sedan skriva koden i en kodredigerare (eng. *editor*). 

På Linux och Mac finns redan en version av Python installerad. För Windows-användare kan man installera Python från [https://www.python.org/downloads/](https://www.python.org/downloads/)

**Visual Studio Code** är en kraftfull och popular kodredigerare från Microsoft. Den kan laddas ner på [https://code.visualstudio.com/download](https://code.visualstudio.com/download). Python-filerna sparas lokalt på datorn. (Se till att de har filändelsen **.py**)

För att köra sitt program skriver man: **`python filnamn.py`*** *(eller **`python3 filnamn.py`**) i terminalen (antingen den inbyggda i VSCode eller operativsystemets terminal).

### **Online med mer avancerade tjänster**

Om man vill arbeta online med en mer professionell utvecklingsmiljö finns det flera lösningar. I de flesta lösningar får man en virtuell maskin där man kan installera valfri programvara. Dessa tjänster är i regel kommersiella men har ofta en begränsad gratisnivå. Exempel på tjänster är:

* [Paiza Cloud](https://paiza.cloud/en/)  
* [Replit](https://replit.com/)  
* [Codeanywhere](https://codeanywhere.com/)  
* [GitHub Codespaces](https://github.com/features/codespaces)

## **Git, GitHub och GitHub Codespaces**

### **Vad är git?**

**Git** är ett **versionshanteringssystem** som används för att spara och hålla ordning på förändringar i kod. Det gör det möjligt att se tidigare versioner, jämföra ändringar och samarbeta med andra utan att skriva över varandras arbete. Git används ofta tillsammans med plattformar som **GitHub** eller **GitLab** för att dela och samarbeta kring kod online.

### **GitHub Codespaces**

**GitHub Codespaces** är en **molnbaserad utvecklingsmiljö** – du programmerar direkt i webbläsaren (eller i VS Code) och har **Git** och **GitHub** integrerat. Du får tillgång till en virtuell maskin (med operativsystemet Linux/Ubuntu som standard) och du kan börja jobba med versionshanterad kod i webbläsaren utan att installera något.

**Github** **Codespaces** ger dig **120 timmar** **kostnadsfri** användning i månaden. (Ca 4 timmar om dagen). En Codespace stänger av automatiskt efter 30 minuters inaktivitet, men för att spara tid kan man **manuellt stänga av** sin Codespace. Det gör man genom GitHubs huvudmeny uppe till höger → Codespaces (direktlänk: [https://github.com/codespaces](https://github.com/codespaces)) och sedan trycka på de tre prickarna vid sin Codespace och välja **Stop Codespace**.

### **Kom igång med GitHub och Codespaces**

### **1\. Skapa ett GitHub-konto**

Gå in på [https://github.com](https://github.com/) och skapa ett nytt konto. Använd gärna din edu-adress.

### **2\. Skapa ett nytt GitHub-repo**

Ett **repo** (kort för *repository*) är i GitHub **en plats där all din kod och dess historik sparas**. Det är alltså både en mapp med filer och en logg över alla ändringar som har gjorts i dessa filer.

1. Klicka på **`+`** knappen uppe till höger (Create new) och välj New Repository. (Eller gå direkt till [github.com/new](https://github.com/new))  
2. Ge projektet ett namn (t.ex. **`python-projekt`** eller **`test-repo`**) (och eventuellt en kort beskrivning).  
3. Klicka på **Create repository**

### **3\. Öppna i Codespaces**

När ditt repo är skapat:

1. Klicka på den gröna knappen **`<>Code`**

2. Välj fliken **Codespaces**

3. Klicka på “**Create codespace on main**”

Detta startar upp en virtuell maskin och öppnar en **VS Code-liknande miljö i webbläsaren** – med Git och Python installerat.

### **4\. Spara och versionshantera med Git**

När du ändrar filer i Codespaces kan du använda Git direkt i den inbyggda terminalen eller via det grafiska gränssnittet i VS Code.

### **Alternativ 1: Via terminal**

#### **Se vilka filer som ändrats:**

```shell
git status
```

#### **Lägg till filerna du vill spara:**

```shell
git add .
```

#### **Skapa en commit (en sparad version):**

```shell
git commit -m "Lade till min första Python-fil"
```

#### **Skicka ändringarna till GitHub:**

```shell
git push
```

### **Alternativ 2: Via VS Code-gränssnittet**

1. Klicka på **Source Control-ikonen** (med gren-symbol) i vänstermenyn. Du ser en lista med ändrade filer.  
2. Klicka på **\+** för att lägga till (stage) filerna.  
3. Skriv ett **commit-meddelande** överst, t.ex. *“Lade till main.py”*.  
4. Klicka på **Commit** (eller `Ctrl+Enter`).  
5. Klicka på **Sync Changes** för att *pusha* (skicka ändringarna) till GitHub.

### **Avancerat: arbeta i grenar (branches)**

Om man vill testa något nytt utan att påverka själva "huvudgrenen" av koden kan man skapa en sidogren \- en **branch**.

#### **Skapa en ny branch med terminalen**

```shell
git checkout -b ny-funktion
```

Du är nu i en ny gren. Gör dina ändringar, committa, och skicka upp till GitHub:

#### **Skicka en ny branch till GitHub**

```shell
git push --set-upstream origin ny-funktion
```

### **Med VS Code-gränssnittet:**

1. Klicka på branch-namnet längst ner i statusfältet (oftast “main”).

2. Skriv in ett nytt namn för din gren, t.ex. **`ny-funktion`**.

3. Tryck Enter – Codespaces byter automatiskt gren.

När du är klar kan du gå till **GitHub-sidan** för projektet och skapa en **Pull Request** för att slå ihop din gren med **`main`**.

#### **Hämta uppdateringar**

Om någon annan ändrat något i projektet:

```shell
git pull
```

eller klicka på **Sync Changes** igen.

### **Vanligt arbetsflöde i Codespaces**

| Steg | Vad du gör | Kommando / Knapp |
| ----- | :---- | :---- |
| **1\.** | Gör ändringar i filer | – |
| **2\.** | Kolla status | **`git status`** |
| **3\.** | Lägg till filer | **`git add`** **`.`** eller “+” i Source Control |
| **4\.** | Skriv commit-meddelande | **`git commit -m "Beskriv ändringen"`** |
| **5\.** | Skicka till GitHub | **`git push`** eller “Sync Changes” |
| **6\.** | Hämta ny kod | **`git pull`** eller “Sync Changes” |
| **7\.** | Testa idéer i ny gren | **`git checkout -b gren-namn`** |

## **Linux och terminalen**

De flesta servrar kör operativsystemet Linux (där den populäraste varianten är [Ubuntu](https://ubuntu.com/)). Servrarna har oftast inte grafiska gränssnitt utan man interagerar med systemet med hjälp av textkommandon. Textgränssnittet benämns med flera olika namn: *terminal, kommandotolk* eller *konsolen* (och även **shell** eller **bash**).

### **Vanliga kommandon**

#### **För att navigera bland filer**

| Kommando | Beskrivning |
| :---- | :---- |
| **`ls`** | Visa filer och mappar i aktuell mapp |
| **`ls -l`** | Visa detaljerad lista över filer och mappar |
| **`ls -lR`** | Visa alla filer och mappar i underliggande mappar |
| **`cd mapp`** | Gå in i undermapp |
| **`cd ..`** | Gå upp ur mappen (upp ett steg) |
| **`cd`** | Gå till hemkatalog |
| **`cd /`** | Går till rotkatalogen |
| **`pwd`** | Skriver ut sökvägen till den aktuella mappen |
| **`clear`** | Rensar skärmen |
| **`man kommando`** | Visar manualsidorna för ett kommando/program |
| **`exit`** | Loggar ut |

#### **Git \- versionshantering**

| Kommando | Beskrivning |
| :---- | :---- |
| **`git status`** | Visar vilka filer som har ändrats |
| **`git add .`** | Lägg till alla ändrade filer till *stage-*area |
| **`git commit -m 'Meddelande'`** | Skapar en *sparpunkt*. Meddelandet bör beskriva vad man gjort |
| **`git push`** | Skicka ändringar till ens repository |
| **`git pull`** | Hämta eventuella uppdateringar från ens repository |

#### **För att skapa/redigera filer/mappar**

| Kommando | Beskrivning |
| :---- | :---- |
| **`mkdir mappnamn`** | Skapar en mapp (kallas för *directory* i Linux) |
| **`touch filnamn`** | Skapar en tom textfil (eller uppdaterar tidsstämpel för en existerande fil eller mapp) |
| **`rm filnamn`** | Raderar en fil |
| **`rmdir`** | Raderar en (tom) mapp |
| **`rm -rf`** | Raderar mappen och allt innehåll |
| **`chmod XXX fil`** | Ändrar rättigheterna till filen/mappen – [verktyg för att skapa kod](http://www.onlineconversion.com/html_chmod_calculator.htm) |
| **`nano filnamn`** | Öppnar textredigeraren nano |
| **`cat filnamn`** | Skriver ut innehållet i en fil |
| **`chown användarnamn filnamn`** | Ändrar ägaren till en fil |

#### **Textredigeraren nano**

| Kommando | Beskrivning |
| :---- | :---- |
| **`nano filnamn`** | Öppnar filen i textredigeraren **nano** |
| **`ctrl+o`** | Sparar fil |
| **`ctrl+x`** | Stäng |

#### **ctrl-d, ctrl-z och ctrl-c**

| Kommando | Beskrivning |
| :---- | :---- |
| **`ctrl-d`** | Avslutar input (t.ex. ett meddelande, mail, chatt etc) |
| **`ctrl-z`**  | Stoppar/pausar ett program/kommando tillfälligt |
| **`ctrl-c`** | Avslutar ett program/kommando |

####  **Övriga kommandon**

| Kommando | Beskrivning |
| :---- | :---- |
| **`date`** | Visar aktuellt datum och tid |
| **`groups`** | Visar vilka grupper den man tillhör |

## 

## **Notebooks**

En notebook är en interaktiv miljö där du kan skriva och köra Python-kod i små delar, steg för steg. Den vanligaste typen är en **Jupyter Notebook**.

Exempel på notebook-miljöer:

* Jupyter Notebook  
* Github Codespace  
* Deepnote

Varför använda notebooks?

 ✅ Bra för dataanalys  
 ✅ Kombinerar kod \+ text \+ visualisering  
 ✅ Lätt att experimentera

### **Hur är en notebook uppbyggd?**

En notebook består av **celler**. Det finns främst två typer:

#### **1\. Kodceller**

Här skriver du Python-kod.

```py
print("Hej världen!")
```

När du kör cellen körs bara den koden – inte hela programmet.

I en notebook behöver du inte ange print för att skriva ut en variabel eller resultatet av en funktion. Om man anger en variabel eller ett funktionsanrop sist i en kod-cell skrivs värdet automatiskt ut.

#### **2\. Textceller (Markdown)**

Här skriver du text, instruktioner eller förklaringar i Markdown-format. Se [https://www.markdownguide.org/cheat-sheet/](https://www.markdownguide.org/cheat-sheet/)

Exempel:

* Rubriker  
* Listor  
* **Fetstil**  
* Kodexempel

### **Hur kör man kod?**

Du kan köra en cell genom att:

* Trycka **Shift \+ Enter**  
* Klicka på “Run”-knappen

Resultatet visas direkt under cellen.

### **Viktigt att förstå: Ordning spelar roll**

Notebook-kod körs i den ordning DU kör den – inte alltid uppifrån och ner.

Det kan skapa problem:

```py
print(x)  # Fel om x inte körts tidigare
```

Tips: Kör alltid om hela notebooken om något känns konstigt.



## **Pakethantering och virtualenv**

## **IPython**

## **Unit testing (enhetstestning)**

