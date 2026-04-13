import React from 'react'

const GradingScale = () => {
  return (
<div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-zinc-100 max-w-7xl mx-auto">
              <h3 className="text-zinc-900 mb-4 text-base gap-2 font-heading flex items-center">
                AdZU Grading Scale
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-base font-body">
                <div>
                  <div className="text-zinc-900">4.0</div>
                  <div className="text-zinc-500">Excellent</div>
                </div>
                <div>
                  <div className="text-zinc-900">3.5</div>
                  <div className="text-zinc-500">Superior</div>
                </div>
                <div>
                  <div className="text-zinc-900">3.0</div>
                  <div className="text-zinc-500">
                    Above Average
                  </div>
                </div>
                <div>
                  <div className="text-zinc-900">2.5</div>
                  <div className="text-zinc-500">
                    High Average
                  </div>
                </div>
                <div>
                  <div className="text-zinc-900">2.0</div>
                  <div className="text-zinc-500">Average</div>
                </div>
                <div>
                  <div className="text-zinc-900">1.5</div>
                  <div className="text-zinc-500">
                    Low Average
                  </div>
                </div>
                <div>
                  <div className="text-zinc-900">1.0</div>
                  <div className="text-zinc-500">Passed</div>
                </div>
                <div>
                  <div className="text-zinc-900">F</div>
                  <div className="text-zinc-500">Failed</div>
                </div>
              </div>
            </div>
  )
}

export default GradingScale