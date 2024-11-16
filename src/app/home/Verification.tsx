function Verification() {
    return (
      <div className="bg-white p-6 rounded-lg ">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Frontend Verification</h2>
        <p className="text-gray-600">
          Verify the accuracy of frontend data and ensure safe operations.
        </p>
        <form className="mt-4 space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Transaction Hash</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Enter transaction hash"
            />
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Verify
          </button>
        </form>
      </div>
    );
  }
  
  export default Verification;
  