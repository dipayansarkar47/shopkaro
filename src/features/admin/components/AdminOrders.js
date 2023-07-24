import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders, updateOrderAsync } from "../../order/orderSlice";
import { PencilIcon, EyeIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline'
import Pagination from "../../common/Pagination";
function AdminOrders() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const orders = useSelector(selectOrders);
    const totalOrders = useSelector(selectTotalOrders);
    const [editableOrderId, setEditableOrderId] = useState(-1)
    const [sort, setSort] = useState({})

    const handleEdit = (order) => {
        setEditableOrderId(order.id);
    }
    const handleShow = () => {
        console.log("handleShow");
    }
    const handleUpdate = (e, order) => {
        const updatedOrder = { ...order, status: e.target.value }
        dispatch(updateOrderAsync(updatedOrder))
        setEditableOrderId(-1)
    }
    const handlePage = (page) => {
        setPage(page)
    };
    const handleSort = (sortOption) => {
        const sort = { _sort: sortOption.sort, _order: sortOption.order };
        console.log({ sort });
        setSort(sort);
    };
    useEffect(() => {

        const pagination = { _page: page, _limit: ITEMS_PER_PAGE }
        dispatch(fetchAllOrdersAsync({ sort, pagination }));
    }, [dispatch, page, sort]);

    const chooseColor = (status) => {
        switch (status) {
            default:
                return 'bg-purple-200 text-purple-600'
            case 'dispatched':
                return 'bg-yellow-200 text-yellow-600'
            case 'delivered':
                return 'bg-green-200 text-green-600'
            case 'cancelled':
                return 'bg-red-200 text-red-600'
        }
    }

    useEffect(() => {
        const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
        dispatch(fetchAllOrdersAsync(pagination));
        // TODO : Server will filter deleted products
    }, [dispatch, page]);

    return (
        <>
            {/* component */}
            <div className="overflow-x-auto">
                <div className=" bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
                    <div className="w-full">
                        <div className="bg-white shadow-md rounded my-6">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 cursor-pointer px-6 text-left"
                                            onClick={(e) =>
                                                handleSort({ sort: 'id', order: sort?._order === 'asc' ? 'desc' : 'asc', })
                                            }>Order# {' '}
                                            {sort._sort === 'id' &&
                                                (sort._order === 'asc' ? (
                                                    <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                                                ) : (
                                                    <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                                                ))}
                                        </th>
                                        <th className="py-3 px-6 text-left">Items</th>
                                        <th
                                            className="py-3 px-6 text-left cursor-pointer"
                                            onClick={(e) =>
                                                handleSort({
                                                    sort: 'totalAmount',
                                                    order: sort?._order === 'asc' ? 'desc' : 'asc',
                                                })
                                            }
                                        >
                                            Total Amount {' '}
                                            {sort._sort === 'totalAmount' &&
                                                (sort._order === 'asc' ? (
                                                    <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                                                ) : (
                                                    <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                                                ))}
                                        </th>
                                        {/* <th className="py-3 px-6 text-center">Shipping Address</th> */}
                                        <th className="py-3 px-6 text-center">Status</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {orders.map(order => <tr className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="mr-2">

                                                </div>
                                                <span className="font-medium">{order.id}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-left">
                                            {order.items.map(item => <div className="flex gap-1 items-center">
                                                <div className="mr-2">
                                                    <img
                                                        alt="thumbnail"
                                                        className="w-6 h-6 mb-1 rounded-full"
                                                        src={item.thumbnail}
                                                    />
                                                </div>
                                                <span className="font-medium">{item.title} - x{item.quantity} - ${discountedPrice(item)}</span>
                                            </div>)}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="font-bold text-purple-500">${order.totalAmount}</p>
                                            </div>
                                        </td>
                                        {/* <td className="py-3 px-6 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <p className="font-bold text-gray-600">{order?.selectedAddress?.name}</p>
                                            </div>
                                        </td> */}
                                        <td className="py-3 px-6 text-center">
                                            {order.id === editableOrderId ? (
                                                <select onChange={e => handleUpdate(e, order)}>
                                                    <option value="pending">Pending</option>
                                                    <option value="dispatched">Dispatched</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>

                                            ) :
                                                (<span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-xs`}>
                                                    {order.status}
                                                </span>)}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex flex-row item-center justify-center">
                                                <div className="flex flex-row mr-2 gap-2 ">
                                                    <EyeIcon onClick={e => handleShow(order)} className="h-6 w-6 transform hover:text-purple-500 hover:scale-110"></EyeIcon>
                                                    <PencilIcon onClick={e => handleEdit(order)} className="h-6 w-6 transform hover:text-purple-500 hover:scale-110"></PencilIcon>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>)}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Pagination
                    page={page}
                    setPage={setPage}
                    handlePage={handlePage}
                    totalItems={totalOrders}
                ></Pagination>
            </div>
        </>

    );
}

export default AdminOrders;