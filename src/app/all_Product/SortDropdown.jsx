"use client";

const SortDropdown = ({ sort, setSort }) => {
return ( <div className="flex items-center gap-2"> <label
             htmlFor="product-sort"
             className="text-sm font-medium text-gray-600"
         >
সাজান </label>


        <select
            id="product-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-emerald-600"
        >
            <option value="default">ডিফল্ট</option>
            <option value="low">কম দাম থেকে বেশি</option>
            <option value="high">বেশি দাম থেকে কম</option>
        </select>
    </div>
);


};

export default SortDropdown;
