package Game;
import java.util.Random;


public class Specialization {
	
	Random healt = new Random();
	Random dmg = new Random();
	
	int HP =0;
	int MS=0;
	int MD=0;
	int MI =0;
	int MC = 0;
	int CA =0;
	public Specialization (int hp, int s, int d, int i, int c, int a) 
	{
		this.HP =hp;
		this.MS =s;
		this.MD =d;
		this.MI =i;
		this.MC =c;
		this.CA= a;
	}
		
	public void fighter() 
	{
		double hp = 10+(2*( 2.5 * (healt.nextDouble()+1)));
		float hpf = Math.round(hp);
		int sal = Math.round(hpf);
		
		int s =2;
		int d =1;
		int i =0;
		int c =2;
		int ca = 5;
		HP = sal;
		MS=s;
		MD = d;
		MI =i;
		MC =c;
		CA = ca;
		
		
	}
	public void thief() 
	{
		double hp = 8+(2*(1.5 *(healt.nextDouble()+1)));
		float hpf = Math.round(hp);
		int sal = Math.round(hpf);
		int s =0;
		int d =3;
		int i =2;
		int c =0;
		int ca = 3;
		HP = sal;
		MS=s;
		MD = d;
		MI =i;
		MC =c;
		CA = ca;
		
	}
	public void monk() 
	{
		double hp = 8+(2*(2 *(healt.nextDouble()+1)));
		float hpf = Math.round(hp);
		int sal = Math.round(hpf);
		int s =1;
		int d =2;
		int i =1;
		int c =1;
		int ca = 4;
		HP = sal;
		MS=s;
		MD = d;
		MI =i;
		MC =c;
		CA = ca;
		
	}
	public void wizard() 
	{
		double hp =6+(2*( 1.5*(healt.nextDouble()+1)));
		float hpf = Math.round(hp);
		int sal = Math.round(hpf);
		int s =0;
		int d =0;
		int i =5;
		int c =0;
		int ca = 3;
		HP = sal;
		MS=s;
		MD = d;
		MI =i;
		MC =c;
		CA = ca;
		
	}
	public int Strenghtattack() 
	{
		int dam= dmg.nextInt(10)+MS;
		
		return dam;
	}
	public int Dexattack() 
	{
		int dam= dmg.nextInt(8)+MD;
		
		return dam;
	}
	public int Intellectattack() 
	{
		int dam= dmg.nextInt(6)+MI;
		
		return dam;
	}
	public int gethp() 
	{
		return HP;
	}
	public int getms() 
	{
		return MS;
	}
	public int getmd() 
	{
		return MD;
	}
	public int getmi() 
	{
		return MI;
	}
	public int getmc() 
	{
		return MC;
	}
	public int getca() 
	{
		return CA;
	}
	
}
