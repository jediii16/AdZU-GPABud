import React from 'react'

const GPAResult = () => {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

      {/* Current Status */}
      <div className="p-6 bg-white rounded-xl shadow-sm border border-zinc-100">
        <h3 className="text-zinc-900 mb-4">
          Current Status
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-zinc-600">Total Units</span>
            <span className="text-zinc-900">test</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-600">Completed Units</span>
            <span className="text-zinc-900">test</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-600">Remaining Units</span>
            <span className="text-zinc-900">test</span>
          </div>
          <div className="pt-3 border-t border-zinc-200">
            <div className="flex justify-between items-center">
              <span className="text-zinc-900">Current GPA</span>
              <span className="text-2xl text-zinc-900">test</span>
            </div>
            <div className="mt-2 text-center">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-sm">
                First Honors
              </span>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm">
                Second Honors
              </span>
              <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-700 text-sm">
                Passed
              </span>
              <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-sm">
                Below Passing
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Required Grades */}
      <div className="p-6 bg-white rounded-xl shadow-sm border border-zinc-100">
        <h3 className="text-zinc-900 mb-4">
          Grade Needed in Remaining Subjects
        </h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-zinc-600">First Honors</span>
              <span className="text-xl text-emerald-600">test</span>
            </div>
            <div className="text-xs text-zinc-500">
              Average of test needed
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-zinc-600">Second Honors</span>
              <span className="text-xl text-blue-600">test</span>
            </div>
            <div className="text-xs text-zinc-500">
              Average of test needed
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-zinc-600">Passing Grade (2.0 GPA)</span>
              <span className="text-xl text-zinc-600">test</span>
            </div>
            <div className="text-xs text-zinc-500">
              Average of test needed
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default GPAResult