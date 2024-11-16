function Transactions() {
    return (
      <div className="bg-white p-6 rounded-lg ">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Transaction Dashboard</h2>
        <p className="text-gray-600">View and manage your recent transactions here.</p>
        <ul className="mt-4 space-y-4">
          <li className="p-4 bg-gray-100 rounded-md shadow">
            <div className="flex justify-between">
              <span>Transaction #1</span>
              <span className="text-green-500 font-medium">Completed</span>
            </div>
            <p className="text-sm text-gray-600">Amount: 1.5 ETH</p>
          </li>
          <li className="p-4 bg-gray-100 rounded-md shadow">
            <div className="flex justify-between">
              <span>Transaction #2</span>
              <span className="text-yellow-500 font-medium">Pending</span>
            </div>
            <p className="text-sm text-gray-600">Amount: 0.8 ETH</p>
          </li>
        </ul>
      </div>
    );
  }
  
  export default Transactions;
  