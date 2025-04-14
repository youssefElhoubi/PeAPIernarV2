import { useState } from "react";
import React from "react";
import PopUp from "../comman/popUp";

type OrderInfo = {
  id: number;
  plant_name: string;
  total: string;
  status: string;
};

type Props = {
  order: OrderInfo;
  token: string;
};

const OrderCard: React.FC<Props> = ({ order, token }) => {
  const [message, setMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const deleteOrder = async (status:string) => {
    if (status !== "pending") {
      return <PopUp isOpen={isOpen} setIsOpen={setIsOpen} message="you can not do this " />
      
    }
    const response = await fetch(`http://peapirineV2.test/api/order/cancel/${order.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const result = await response.json();

    if (response.ok) {
      setMessage(result.message || "Order deleted successfully.");
      setIsOpen(true);
    } else {
      setMessage(result.message || "Failed to delete order.");
      setIsOpen(true);
    }
  };

  return (
    <>
      <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-80">
        <div className="p-4">
          <h6 className="mb-2 text-slate-800 text-xl font-semibold">
            {order.plant_name}
          </h6>
          <p className="text-slate-600 font-medium">Total: {order.total} MAD</p>
          <p className="text-slate-500">Status: <span className="capitalize font-semibold">{order.status}</span></p>
        </div>
        <div className="px-4 pb-4 pt-0 mt-2">
          <button
            className={`rounded-md bg-red-600 py-2 px-4 text-white text-sm shadow-md hover:bg-red-700 ${
              order.status === "pending" ? "" : "opacity-50 cursor-not-allowed"
            }`}
            onClick={()=>{deleteOrder(order.status)}}
          >
            Delete Order 
          </button>
        </div>
      </div>

      <PopUp isOpen={isOpen} setIsOpen={setIsOpen} message={message} />
    </>
  );
};

export default OrderCard;
