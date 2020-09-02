import React from "react"
import Link from "next/link"

const SimpleTable = () => (
  <table className="td-plain th-plain text-sm w-full">
    <thead>
      <tr>
        <th>Name</th>
        <th>Relationship</th>
        <th>DOB</th>
      </tr>
    </thead> 
    <tbody>
      <tr>
        <td className="px-5 py-3">Jim Halpert</td>
        <td className="px-5 py-3">Husband</td>
        <td className="px-5 py-3">05/01/1985</td>
      </tr>
      <tr>
        <td className="px-5 py-3">Michael Scott</td>
        <td className="px-5 py-3">Friend</td>
        <td className="px-5 py-3">05/01/1975</td>
      </tr>
    </tbody>
  </table>
)

export { SimpleTable as default, SimpleTable }
