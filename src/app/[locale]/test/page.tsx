import React from 'react'

/**
 * Test Page Component
 * 
 * This page is used to test if content displays properly under the navbar
 * or if it gets hidden by the navbar.
 * 
 * TODO: Add more test elements with different heights and positions
 * TODO: Consider adding visual indicators for navbar overlap areas
 */
const page = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      <p className="mb-4">Just a random bunch of text to see if it displays under the navbar or get hidden by the navbar</p>
      
      {/* Adding more content to make the page more visible */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-4">
        <h2 className="text-xl font-semibold mb-2">Content Section 1</h2>
        <p>This section should be visible below the navbar. If you can see this text clearly without it being hidden by the navbar, then the layout is working correctly.</p>
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-2">Content Section 2</h2>
        <p>This is another section to verify that content is properly displayed below the navbar without any spacer div.</p>
      </div>
    </div>
  )
}

export default page