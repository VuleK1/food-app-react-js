import './Home.css'
import { useState, useEffect } from 'react'
import { db, auth } from './firebase-config'
import { collection, getDocs } from 'firebase/firestore'
import{
  onAuthStateChanged,
  signOut,
} from "firebase/auth"

export const Home = () =>{

    const [food, setFoods] = useState([])
    const dbRef = collection(db, 'food')
  
    const [drinks, setDrinks] = useState([])
    const dbRefDrinks = collection(db, 'drinks')

    const [orders, setOrders] = useState([])

    const [user, setUser ] = useState({});
  
    onAuthStateChanged(auth, (CurrentUser) => {
      setUser(CurrentUser);
    });

    const remove = (izbor) => {
      const postoji = orders.find((x) => x.id === izbor.id)
  
      if(postoji){
        if(postoji.kolicina === 1){
              setOrders(orders.filter((order) => order.id !== izbor.id))
        }else{
          setOrders(
            orders.map((order) =>
            order.id === izbor.id ?
             { ...postoji, kolicina: postoji.kolicina - 1 } 
             : order
            )
        )
        }
      }
    }

    const totalPrice = () => {

      let total = 0;

      orders.map((order) => total = total + order.cena * order.kolicina)

      let tips = document.getElementById("tips")
     
      if(tips){
        return total +  tips.value;

      }else{
          return total;
      }
     
    }

    const obrisi = (izbor) => {
        setOrders(orders.filter((order) => order.id !== izbor.id))
  }

    const add = (izbor) => {

      const postoji = orders.find((x) => x.id === izbor.id)
  
  
          if (postoji) {
            setOrders(
                  orders.map((order) =>
                  order.id === izbor.id ?
                   { ...postoji, kolicina: postoji.kolicina + 1 } 
                   : order
                  )
              )
          } else {
            setOrders([...orders, { ...izbor, kolicina: 1 }])
  
          }
  
    }
  
    useEffect(() => {
  
  
      const getFood = async () => {
        const data = await getDocs(dbRef);
        console.log(data)
        setFoods(data.docs.map(
          (doc) => ({...doc.data(), id: doc.id })
        ))
      };
  
  
      getFood();
  
      const getDrinks = async () => {
        const data = await getDocs(dbRefDrinks);
        console.log(data)
        setDrinks(data.docs.map(
          (doc) => ({...doc.data(), id: doc.id })
        ))
      };
  
  
      getDrinks();
  
  
    }, []);
  
    const logout = async () => {
        await signOut(auth)
    }

    return (
      <div className='home'>

        <div className="App">
            {
              food.map((jelo) => {
                  return(
                    <div className='menuCard'>
                      <div className='menuInfo'>
                        <h3>{jelo.ime}</h3>
                        <h4>{jelo.opis}</h4>
                        <h4>{jelo.cena}</h4>
                        <button onClick={() => add(jelo)}>Add to cart</button>
                      </div>
  
                      <div className='menuImg'>
                        <img src={jelo.img}></img>
                      </div>
                    </div>
                  )
  
  
              })
            }
  
        </div>
  
        <div className='App'>
            {
              drinks.map((drink) => {
                return(
                  <div className='menuCard'>
                    <div className='menuInfo'>
                      <h3>{drink.ime}</h3>
                      <h4>{drink.opis}</h4>
                      <h4>{drink.cena}</h4>
                      <button onClick={() => add(drink)}>Add to cart</button>
                    </div>
  
                    <div className='menuImg'>
                      <img src={drink.img}></img>
                    </div>
                  </div>
                )
  
  
              })
            }
        </div>
        {
          orders.length > 0 ? (<div className='korpa'>
          <h3>Korpa</h3>
          {
    orders.map((order) => {
      return (
          <div className='order'>
            <h4>{order.ime} </h4>
            <h4>{order.cena} RSD </h4>
            <button onClick={() => remove(order)}> - </button>
            <h4>{order.kolicina}</h4>
            <button onClick={() => add(order)}> + </button>
            <h4> ukupno {order.cena * order.kolicina} RSD</h4>
            <button onClick={() => obrisi(order)}> X </button>
          </div>
      )

    })
  }
  <h4> Ukupna Cena: {totalPrice()} </h4>
  <h4> Cena dostava: {totalPrice() > 3000 ? 0 : totalPrice() * 0.1} </h4>
  <h4> Tips </h4>
  <input id="tips" type='number'></input>
    </div>) : (<div/>)
        }
        
      </div>
    );
    
}