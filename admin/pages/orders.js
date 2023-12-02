import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function OrdersPage(){
  const [orders, setOrders] = useState([]);

  useEffect(()=>{
    axios.get('/api/orders').then(response=>{
      setOrders(response.data)
    });
  }, [])

  const options = {
    weekday:"long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour:"numeric",
    minute:"numeric",
    hour12:true,
    
  }

  return(
    <Layout>
      <h1>Orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Paid</th>
            <th>Recipient</th>
            <th>Produts</th>
          </tr>
        </thead>
        <tbody>
          {orders.length >0 && orders.map(order => (
            <tr>
              <td>{new Date(order.createdAt).toLocaleString("en-GB", options)}</td>
              <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
                {order.paid ? 'YES' : 'NO'}
              </td>
              <td>
                {order.name} {order.email} <br />
                {order.city} {order.postCode} <br />
                {order.country} <br />
                {order.streetAddress} <br />
              </td>
              <td>
                {order.line_items.map(l=>(
                  <>
                  {l.price_data?.product_data?.name} x 
                  {l.quantity}<br/>
                  </>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}