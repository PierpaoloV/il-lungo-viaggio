
import java.util.Scanner;
import java.util.Random;
import Game.Users;
import Objects.Weapon;
import Game.Race;
import Game.Specialization;
 
public class PLayer {

	String name,sex;
	static int S,D,I,C,A,B,hp;
	
	Users user = new Users(name, sex , hp);
	Race race = new Race (S, D,I,C, A);
	Specialization classe = new Specialization (hp,S, D,I,C, A);
	public PLayer(String name, String sex, double hp, int S, int D, int I, int C, int A)
	 
	{
		this.name = name;
		this.sex = sex;
		hp = user.Hp;
		S =race.Strenght;
		D = race.Dexterity;
		I = race.Intellect;
		C = race.Costitution;
		A = race.Armor;
	}
	
}
