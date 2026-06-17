package Game;
import Objects.Weapon;

public class Users {

	 public String name;
	//String age;
	public String sex;
	public int Hp;
	Weapon weapon = new Weapon();
	//Race race = new Race();
	//Specialization spec = new Specialization();
	public Users (String nam, String se, int H) 
	{
		this.name= nam;
		this.sex = se;
		this.Hp = H;
	}
}
