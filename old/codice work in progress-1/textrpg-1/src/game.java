/* Game Project: RPG TEXT BASED
 * Autore: Andrea Alegni
 * Creato: 11/05/2018 ore 12:30
 * Versione: 0.2
 * Team: Pierpaolo - Rocco - Zazu */

import java.util.Scanner;
import java.util.Random;
import Game.Users;
import NPG.Monster;
import Objects.Weapon;
import Game.Race;
import Game.Specialization;
 
public class game {
	
	
	static String nome, sesso;
	int mhp,mdmg;
	static int hp, forza, destrezza, intelletto, costituzione, ca;
	Scanner myScanner = new Scanner(System.in);
	Scanner enterScanner = new Scanner(System.in);
	int razza, spec, choice;
	Users user = new Users(nome, sesso , hp);
	Race race = new Race (forza, destrezza,intelletto,costituzione, ca);
	Specialization classe = new Specialization(hp,forza, destrezza, intelletto, costituzione, ca);
	Monster monster = new Monster(mhp, mdmg);
	PLayer utente = new PLayer(nome, sesso, hp, forza, destrezza, intelletto, costituzione, ca);
	
	int silverRing;
		
	public static void main(String[] args) {

		game game;
		game = new game();
		game.cap0();
		game.Intro(); 
		
		game.Player();
		//pippo.townGate();
	}
	
	public void cap0() 
	{
		System.out.println("Quella notte feci un sogno...");
	}
	public void Intro(){
		
		//Users user = new Users(nome, sesso , hp);
		//Race race = new Race (forza, destrezza,intelletto,costituzione, ca);
		//Specialization classe = new Specialization(hp,forza, destrezza, intelletto, costituzione, ca);
		
		
		System.out.println("Sento una voce... chi parla? [Inserisci il tuo nome]:");
		user.name = myScanner.nextLine();
		System.out.println("mmmm.... "+user.name+ "... Ne e' passato di tempo da quando sentii l'ultima voce....\n");
		System.out.println( " non riesco piu' a capirlo, sei un uomo o una donna?");
		user.sex = myScanner.nextLine();
		if (myScanner.equals("")) 
		{
			System.out.println( " non riesco piu' a capirlo, sei un uomo o una donna?");	
		}
		
		System.out.println("\n Bene " + user.name + ",finalmente trovo qualche "+user.sex+". \n Ma dimmi, poiche' sono cieco, come sei fatto?");	
		System.out.println("1: Umano ");
		System.out.println("2: Nano ");
		System.out.println("3: Halfing ");
		System.out.println("4: Elfo ");
		razza = myScanner.nextInt();
		if(razza==1) 
		{
			System.out.println("Ah, Sei un umano quindi :) ");
			race.umano();
		}
		else if(razza ==2) 
		{
			System.out.println("Sicuro di non essere solo basso? v.v ");
			race.nano();
		}
		else if(razza ==3) 
		{
			System.out.println("Porta l'anello a Mordor, Frodo!");
			race.halfling();
		}
		else if(razza ==4) 
		{
			System.out.println(".... G A Y .... ");
			race.elfo();
		}
		
		System.out.println("");
		System.out.println("E dimmi, che lavoro fai "+user.name+" ?");
		System.out.println("");
		System.out.println("1: Guerriero ");
		System.out.println("2: Ladro ");
		System.out.println("3: Mago ");
		System.out.println("4: Monaco ");
		spec = myScanner.nextInt();
		System.out.println("");
		if(spec==1) 
		{
			System.out.println("Ah, Sei un combattente!");
			classe.fighter();
		}
		else if(spec ==2) 
		{
			System.out.println("Caspita, dovrei nascondere tutto il mio oro, se l'avessi ancora... ");
			classe.thief();
		}
		else if(spec ==3) 
		{
			System.out.println("You are a Wizard, Harry!");
			classe.wizard();
		}
		else if(spec ==4) 
		{
			System.out.println("Amen. ");
			classe.monk();
		}
		System.out.println("");
		user.Hp= classe.gethp();
		race.Strenght = race.Strenght + (2* classe.getms());
		race.Dexterity = race.Dexterity + (2* classe.getmd());
		race.Intellect = race.Intellect + (2* classe.getmi());
		race.Costitution = race.Costitution + (2* classe.getmc());
		race.Armor = race.Armor+ classe.getca();
		PLayer utente = new PLayer(nome, sesso, hp, forza, destrezza, intelletto, costituzione, ca);
		utente.name=user.name;
		utente.sex =user.sex;
		utente.A = race.Armor;
		utente.S = race.Strenght;
		utente.D = race.Dexterity;
		utente.I= race.Intellect;
		utente.hp = user.Hp;
		utente.C= race.Costitution;
		
		System.out.println("Bene, "+user.name+ " Le tue statistiche sono le seguenti: ");
		System.out.println("\n------------------------------------------------------------------\n");
		System.out.println("Salute: ");
		System.out.println(user.Hp);
		System.out.println("");
		System.out.println("Forza: ");
		System.out.println( race.Strenght);
		System.out.println("");
		System.out.println("Destrezza: ");
		System.out.println( race.Dexterity );
		System.out.println("");
		System.out.println("Intelletto: ");
		System.out.println( race.Intellect );
		System.out.println("");
		System.out.println("Costituzione:");
		System.out.println( race.Costitution );
		System.out.println("");
		System.out.println("Classe Armatura:");
		System.out.println( race.Armor );
		System.out.println("");
		System.out.println("Bene, "+user.name+" ora posso immaginare come sei \n");
		System.out.println("E' arrivato il tuo momento, puoi fare quel che vuoi.\n");
		System.out.println("\n-------------------------F I N E  C A P. 0------------------------\n");
		
	}
	
	public void Player() 
	{
		System.out.println("Bene, "+user.name+ " Le tue statistiche sono le seguenti: ");
		System.out.println("\n----------------------------PLAYER RECAP---------------------------------\n");
		System.out.println("Sesso: ");
		System.out.println(utente.sex);
		System.out.println("");
		System.out.println("Salute: ");
		System.out.println(utente.hp);
		System.out.println("");
		System.out.println("Forza: ");
		System.out.println( utente.S);
		System.out.println("");
		System.out.println("Destrezza: ");
		System.out.println( PLayer.D );
		System.out.println("");
		System.out.println("Intelletto: ");
		System.out.println( PLayer.I );
		System.out.println("");
		System.out.println("Costituzione:");
		System.out.println( PLayer.C );
		System.out.println("");
		System.out.println("Classe Armatura:");
		System.out.println( PLayer.A );
		System.out.println("");
		System.out.println("E' arrivato il tuo momento, puoi fare quel che vuoi.\n");
		System.out.println("\n-------------------------PLAYER RECAP------------------------\n");
	}	
	
	
	/*public void townGate(){
		
		System.out.println("\n------------------------------------------------------------------\n");
		System.out.println("Sei all'entrata di una citta.");
		System.out.println("Una guardia e' ferma davanti a te.");
		System.out.println("");
		System.out.println("Cosa fai?");
		System.out.println("");
		/*System.out.println("1: Parli con la guardia");
		System.out.println("2: Attacchi la guardia");
		System.out.println("3: Te ne vai");
		System.out.println("\n------------------------------------------------------------------\n");

		choice = myScanner.nextLine();
		
		if(choice.equals("Parli con la guardia")){
			if(silverRing==1){
				ending();
			}
			else{
				System.out.println("");
				System.out.println("Guardia: Hey salve, straniero. Cosi il tuo nome e' " + playerName + "? \nMi dispiace ma non possiamo lasciare entrare stranieri in città.");
				enterScanner.nextLine();
				townGate();
			}
			
		}
		else if(choice.equals("Attacchi la guardia")){
			playerHP = playerHP-1;
			System.out.println("Guardia: Hey non essere stupido.\n\nLa guardia ti colpisce cosi forte da scaraventarti a terra.\n(Ricevi 1 danno)\n");
			System.out.println("Your HP: " + playerHP);
			enterScanner.nextLine();
			townGate();
		}
		else if(choice.equals("Te ne vai")){
			crossRoad();
		}	
		else{
			townGate();
		}
	}
	
	public void crossRoad(){
		System.out.println("\n------------------------------------------------------------------\n");
		System.out.println("Ti ritrovi ad un bivio. Se andrai a sud, tornerai all'entrata della citta'�.\n\n");
		System.out.println("1: Vai a Nord");
		System.out.println("2: Vai ad ovest");
		System.out.println("3: Vai a sud");
		System.out.println("4: Vai a est");
		System.out.println("\n------------------------------------------------------------------\n");
		
		choice = myScanner.nextLine();
		
		if(choice.equals("Nord")){
			north();
		}
		else if(choice.equals("Est")){
			east();
		}
		else if(choice.equals("sud")){
			townGate();
		}
		else if(choice.equals("ovest")){
			west();
		}
		else{
			crossRoad();
		}
	}
	
	public void north(){
		System.out.println("\n------------------------------------------------------------------\n");
		System.out.println("Ti ritorvi in riva ad un fiume. Bevi acqua e ti riposi.");
		System.out.println("I tuoi punti vita aumentano di 1");
		playerHP = playerHP + 1;
		System.out.println("Your HP: " + playerHP);
		System.out.println("\n\n1: Torna al bivio");
		System.out.println("\n------------------------------------------------------------------\n");
		
		choice = myScanner.nextLine();
		
		if(choice.equals("indietro")){
			crossRoad();
		}
		else{
			north();
		}
	}
	
	public void east(){
		System.out.println("\n------------------------------------------------------------------\n");
		System.out.println("Entri in una foresta e trovi una Spada Lunga");
		playerWeapon = "Spada Lunga";
		System.out.println("La tua arma: "+ playerWeapon);
		System.out.println("\n\n1: Torna al bivio");
		System.out.println("\n------------------------------------------------------------------\n");
		
		choice = myScanner.nextLine();
		
		if(choice.equals("indietro") ){
			crossRoad();
		}
		else{
			east();
		}
	}
	
	public void west(){
		System.out.println("\n------------------------------------------------------------------\n");
		System.out.println("Ti scontri con un Goblin!\n");
		System.out.println("1: Combatti");
		System.out.println("2: Scappa");
		System.out.println("\n------------------------------------------------------------------\n");
		
		choice = myScanner.nextLine();
		
		if(choice.equals("fight")){
			fight();
		}
		else if(choice.equals("scappa")){
			crossRoad();
		}
		else{
			west();
		}
	}
	
	public void fight(){
		System.out.println("\n------------------------------------------------------------------\n");
		System.out.println("I tuoi HP: "+ playerHP);
		System.out.println("Goblin HP: " + monsterHP);
		System.out.println("\n1: Attacca");
		System.out.println("2: Scappa");
		System.out.println("\n------------------------------------------------------------------\n");
		
		choice = myScanner.nextLine();
		
		if(choice.equals("attack")){
			attack();
		}
		else if(choice.equals("indietro")){
			crossRoad();
		}
		else{
			fight();
		}
	}
	
	public void attack(){
		int playerDamage = 0;
		
		
		if(playerWeapon.equals("Coltello arruginito")){
			playerDamage = new java.util.Random().nextInt(5); 
		}
		else if(playerWeapon.equals("Spada Lunga")){
			playerDamage = new java.util.Random().nextInt(8); 
		}
		else if(playerWeapon.equals("Pugni")) {
			playerDamage = new java.util.Random().nextInt(10);
		}
		
		System.out.println("Attacchi il Goblin con un fendente = " + playerDamage + " danni!");
		
		monsterHP = monsterHP - playerDamage;
		
		System.out.println("Monster HP: " + monsterHP);
		
		if(monsterHP<1){ win(); } else if(monsterHP>0){
			int monsterDamage =0;
			
			monsterDamage = new java.util.Random().nextInt(4);
			
			System.out.println("Il Goblin ti attacca = " + monsterDamage + " danni!");
			
			playerHP = playerHP - monsterDamage;
			
			System.out.println("Player HP: " + playerHP);
			
			if(playerHP<1){ dead(); } else if(playerHP>0){
				fight();
			}
		}
		
		
	}*/
	
	public void dead(){
		System.out.println("\n------------------------------------------------------------------\n");
		System.out.println("Sei Morto!!!");
		System.out.println("\n\nGAME OVER");
		System.out.println("\n------------------------------------------------------------------\n");
		
	}
	
	/*public void win(){
		System.out.println("\n------------------------------------------------------------------\n");
		System.out.println("Hai ucciso il Goblin!");
		System.out.println("Il Goblin lasca cadere un anello d'argento!");
		System.out.println("Ottieni un anello d'argento\n\n");
		System.out.println("1: Vai a est");
		System.out.println("\n------------------------------------------------------------------\n");
		
		silverRing = 1;
		
		choice = myScanner.nextLine();
		if(choice.equals("vai")){
			crossRoad();
		}
		else{
			win();
		}
		
	}*/
	
	public void ending(){
		System.out.println("\n------------------------------------------------------------------\n");
		System.out.println("Guardia: OH!! E cosi hai ucciso il Goblin!");
		System.out.println("Guardia: Sembri proprio un tipo perbene. Benvenuto nella nostra citta'!");
		System.out.println("\n\n           Fine prima parte                    ");
		System.out.println("\n------------------------------------------------------------------\n");
	}

	public void comb() 
	{
		Random dice = new Random();
		int dmg =0;
		int die =0;
		int monsterhp = monster.gethp();
		boolean attack =false;
		die=dice.nextInt(20); 
		if(die <10 ) 
		{
			System.out.println("Non riesci a colpire :(");
		}
	}
}
