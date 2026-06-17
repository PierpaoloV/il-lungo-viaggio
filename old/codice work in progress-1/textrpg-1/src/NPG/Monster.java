package NPG;
 
import java.util.Random;

public class Monster {
	
	public int monsterHp;
	//int monsterDamage;
	//boolean range = false;
	//int monsterRangeDamage;
	public int Damage;
	String monsterWeapon;
	Random num = new Random();
	public Monster(int hp, int dmg) 
	{
		this.monsterHp=hp;
		this.Damage =dmg;
	}
	
	public void Goblin() {
		monsterHp = 5;
		//range = false;
		//monsterDamage = 4;
		//monsterRangeDamage = 2;
		Damage =goblinattack();
		
		
	}
	public int goblinattack() 
	{
		int x = num.nextInt();
		if (x==0) 
		{
			monsterWeapon = "lancia";
			Damage = num.nextInt(4);
			return Damage;
		}
		else 
		{
			monsterWeapon = "arco";
			Damage =num.nextInt(2);
			return Damage;
		}
	}
  public int gethp() 
  {
	  return monsterHp;
  }
}
