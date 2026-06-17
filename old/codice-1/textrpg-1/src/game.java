
/* Game Project: RPG TEXT BASED
 * Autore: Andrea Alegni
 * Creato: 11/05/2018 ore 12:30
 * Versione: 0.1
 * Team: Pierpaolo - Rocco - Zazu */

import java.util.Scanner;
import Game.Users;
import Objects.Weapon;
import Game.Race;
import Game.Specialization;

public class game {

	String nome, sesso;
	int salute, forza, destrezza, intelletto, costituzione;
	Scanner myScanner = new Scanner(System.in);
	Scanner enterScanner = new Scanner(System.in);
	int choice;

	int silverRing;

	public static void main(String[] args) {

		game pippo;
		pippo = new game();
		pippo.playerSetUp();
		// pippo.townGate();
	}

	public void playerSetUp() {

		Users user = new Users(nome, sesso, salute);
		Race race = new Race(forza, destrezza, intelletto, costituzione);
		user.Hp = 10;

		// monsterHP = 15;

		// playerWeapon = "Coltello arruginito";

		// System.out.println("I tuoi HP: "+ user.Hp);
		// System.out.println("La tua arma: "+ playerWeapon);

		System.out.println("Inserisci il tuo nome:");
		user.name = myScanner.nextLine();
		System.out.println("Maschio o Femmina?");
		user.sex = myScanner.nextLine();

		System.out.println("Ciao " + user.name + ",quindi sei " + user.sex + " scegli la tua razza!");
		System.out.println("1: Umano");
		choice = myScanner.nextInt();
		if (choice == 1) {
			race.umano();
		}
		System.out.println("Statistiche: ");
		System.out.println("\n------------------------------------------------------------------\n");
		System.out.println("Forza");
		System.out.println(race.Dexterity);
		System.out.println("");
		System.out.println("Destrezza");
		System.out.println(race.Strenght);
		System.out.println("");
		System.out.println("Intelletto");
		System.out.println(race.Intellect);
		System.out.println("");
		System.out.println("Costituzione");
		System.out.println(race.Costitution);
		System.out.println("");
	}

	public void townGate() {

		System.out.println("\n------------------------------------------------------------------\n");
		System.out.println("Sei all'entrata di una citta.");
		System.out.println("Una guardia e' ferma davanti a te.");
		System.out.println("");
		System.out.println("Cosa fai?");
		System.out.println("");
		/*
		 * System.out.println("1: Parli con la guardia");
		 * System.out.println("2: Attacchi la guardia");
		 * System.out.println("3: Te ne vai");
		 */
		System.out.println("\n------------------------------------------------------------------\n");

		choice = myScanner.nextLine();

		if (choice.equals("Parli con la guardia")) {
			if (silverRing == 1) {
				ending();
			} else {
				System.out.println("");
				System.out.println("Guardia: Hey salve, straniero. Cosi il tuo nome e' " + playerName
						+ "? \nMi dispiace ma non possiamo lasciare entrare stranieri in citt√†.");
				enterScanner.nextLine();
				townGate();
			}

		} else if (choice.equals("Attacchi la guardia")) {
			playerHP = playerHP - 1;
			System.out.println(
					"Guardia: Hey non essere stupido.\n\nLa guardia ti colpisce cosi forte da scaraventarti a terra.\n(Ricevi 1 danno)\n");
			System.out.println("Your HP: " + playerHP);
			enterScanner.nextLine();
			townGate();
		} else if (choice.equals("Te ne vai")) {
			crossRoad();
		} else {
			townGate();
		}
	}

	public void crossRoad() {
		System.out.println("\n------------------------------------------------------------------\n");
		System.out.println("Ti ritrovi ad un bivio. Se andrai a sud, tornerai all'entrata della citta'†.\n\n");
		System.out.println("1: Vai a Nord");
		System.out.println("2: Vai ad ovest");
		System.out.println("3: Vai a sud");
		System.out.println("4: Vai a est");
		System.out.println("\n------------------------------------------------------------------\n");

		choice = myScanner.nextLine();

		if (choice.equals("Nord")) {
			north();
		} else if (choice.equals("Est")) {
			east();
		} else if (choice.equals("sud")) {
			townGate();
		} else if (choice.equals("ovest")) {
			west();
		} else {
			crossRoad();
		}
	}

	public void north() {
		System.out.println("\n------------------------------------------------------------------\n");
		System.out.println("Ti ritorvi in riva ad un fiume. Bevi acqua e ti riposi.");
		System.out.println("I tuoi punti vita aumentano di 1");
		playerHP = playerHP + 1;
		System.out.println("Your HP: " + playerHP);
		System.out.println("\n\n1: Torna al bivio");
		System.out.println("\n------------------------------------------------------------------\n");

		choice = myScanner.nextLine();

		if (choice.equals("indietro")) {
			crossRoad();
		} else {
			north();
		}
	}

	public void east() {
		System.out.println("\n------------------------------------------------------------------\n");
		System.out.println("Entri in una foresta e trovi una Spada Lunga");
		playerWeapon = "Spada Lunga";
		System.out.println("La tua arma: " + playerWeapon);
		System.out.println("\n\n1: Torna al bivio");
		System.out.println("\n------------------------------------------------------------------\n");

		choice = myScanner.nextLine();

		if (choice.equals("indietro")) {
			crossRoad();
		} else {
			east();
		}
	}

	public void west() {
		System.out.println("\n------------------------------------------------------------------\n");
		System.out.println("Ti scontri con un Goblin!\n");
		System.out.println("1: Combatti");
		System.out.println("2: Scappa");
		System.out.println("\n------------------------------------------------------------------\n");

		choice = myScanner.nextLine();

		if (choice.equals("fight")) {
			fight();
		} else if (choice.equals("scappa")) {
			crossRoad();
		} else {
			west();
		}
	}

	public void fight() {
		System.out.println("\n------------------------------------------------------------------\n");
		System.out.println("I tuoi HP: " + playerHP);
		System.out.println("Goblin HP: " + monsterHP);
		System.out.println("\n1: Attacca");
		System.out.println("2: Scappa");
		System.out.println("\n------------------------------------------------------------------\n");

		choice = myScanner.nextLine();

		if (choice.equals("attack")) {
			attack();
		} else if (choice.equals("indietro")) {
			crossRoad();
		} else {
			fight();
		}
	}

	public void attack() {
		int playerDamage = 0;

		if (playerWeapon.equals("Coltello arruginito")) {
			playerDamage = new java.util.Random().nextInt(5);
		} else if (playerWeapon.equals("Spada Lunga")) {
			playerDamage = new java.util.Random().nextInt(8);
		} else if (playerWeapon.equals("Pugni")) {
			playerDamage = new java.util.Random().nextInt(10);
		}

		System.out.println("Attacchi il Goblin con un fendente = " + playerDamage + " danni!");

		monsterHP = monsterHP - playerDamage;

		System.out.println("Monster HP: " + monsterHP);

		if (monsterHP < 1) {
			win();
		} else if (monsterHP > 0) {
			int monsterDamage = 0;

			monsterDamage = new java.util.Random().nextInt(4);

			System.out.println("Il Goblin ti attacca = " + monsterDamage + " danni!");

			playerHP = playerHP - monsterDamage;

			System.out.println("Player HP: " + playerHP);

			if (playerHP < 1) {
				dead();
			} else if (playerHP > 0) {
				fight();
			}
		}

	}

	public void dead() {
		System.out.println("\n------------------------------------------------------------------\n");
		System.out.println("Sei Morto!!!");
		System.out.println("\n\nGAME OVER");
		System.out.println("\n------------------------------------------------------------------\n");

	}

	public void win() {
		System.out.println("\n------------------------------------------------------------------\n");
		System.out.println("Hai ucciso il Goblin!");
		System.out.println("Il Goblin lasca cadere un anello d'argento!");
		System.out.println("Ottieni un anello d'argento\n\n");
		System.out.println("1: Vai a est");
		System.out.println("\n------------------------------------------------------------------\n");

		silverRing = 1;

		choice = myScanner.nextLine();
		if (choice.equals("vai")) {
			crossRoad();
		} else {
			win();
		}

	}

	public void ending() {
		System.out.println("\n------------------------------------------------------------------\n");
		System.out.println("Guardia: OH!! E cosi hai ucciso il Goblin!");
		System.out.println("Guardia: Sembri proprio un tipo perbene. Benvenuto nella nostra citta'!");
		System.out.println("\n\n           Fine prima parte                    ");
		System.out.println("\n------------------------------------------------------------------\n");
	}
}
