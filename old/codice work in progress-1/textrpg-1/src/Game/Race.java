package Game;

public class Race {

	public int Strenght =0;
	public int Dexterity =0;
	public int Intellect=0;
	public int Costitution=0;
	public int Armor =10;
	public int choiche;
	
	public Race (int s, int d, int i, int c, int a) 
	{
		this.Strenght=s;
		this.Dexterity=d;
		this.Intellect=i;
		this.Costitution =c;
		this.Armor =a;
	}
	public void umano() 
	{
		int s = 10;
		int d = 10;
		int i = 10;
		int c = 10;
		int a = 10;
		Strenght = s;
		Dexterity =d;
		Intellect = i;
		Costitution = c;
		Armor = a;
		
		
	};
	public void nano() 
	{
		int s = 12;
		int d = 8;
		int i = 8;
		int c = 12;
		int a = 11;
		Strenght = s;
		Dexterity =d;
		Intellect = i;
		Costitution = c;
		Armor = a;
		
		
	};
	public void elfo() 
	{
		int s = 8;
		int d = 12;
		int i = 12;
		int c = 8;
		int a = 9;
		Strenght = s;
		Dexterity =d;
		Intellect = i;
		Costitution = c;
		Armor = a;
		
		
	};
	public void halfling() 
	{
		int s = 8;
		int d = 10;
		int i = 11;
		int c = 11;
		int a = 9;
		Strenght = s;
		Dexterity =d;
		Intellect = i;
		Costitution = c;
		Armor = a;
		
		
	};
}

