export default function Loading() {
	return (
		<div className="min-h-screen bg-gray-50">
			<main>
				<div className="w-full px-4 py-6 md:py-8">
					<div className="max-w-7xl mx-auto">
						<div className="h-5 w-32 bg-gray-200 rounded mb-6 animate-pulse" />

						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							<div className="lg:col-span-2 space-y-6">
								<div className="bg-white rounded-md shadow-sm p-6 border-l-4 border-blue-600">
									<div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
										<div className="w-24 h-24 bg-gray-200 rounded-md animate-pulse" />
										<div className="flex-1 space-y-3">
											<div className="h-7 w-2/3 bg-gray-200 rounded animate-pulse" />
											<div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
											<div className="flex gap-3">
												<div className="h-7 w-28 bg-gray-200 rounded animate-pulse" />
												<div className="h-7 w-24 bg-gray-200 rounded animate-pulse" />
												<div className="h-7 w-36 bg-gray-200 rounded animate-pulse" />
											</div>
										</div>
									</div>
								</div>

								<div className="bg-white rounded-md shadow-sm p-6">
									<div className="h-6 w-40 bg-gray-200 rounded mb-4 animate-pulse" />
									<div className="space-y-3">
										<div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
										<div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
										<div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
									</div>
								</div>

								<div className="grid md:grid-cols-2 gap-6">
									<div className="bg-white rounded-md shadow-sm p-6">
										<div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
										<div className="space-y-2">
											{Array.from({ length: 5 }).map((_, i) => (
												<div key={i} className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
											))}
										</div>
									</div>
									<div className="bg-white rounded-md shadow-sm p-6">
										<div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
										<div className="space-y-2">
											{Array.from({ length: 5 }).map((_, i) => (
												<div key={i} className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
											))}
										</div>
									</div>
								</div>
							</div>

							<div className="space-y-6">
								<div className="bg-white rounded-md shadow-sm p-6">
									<div className="h-6 w-24 bg-gray-200 rounded mb-4 animate-pulse" />
									<div className="flex items-center space-x-4 mb-4">
										<div className="w-16 h-16 bg-gray-200 rounded-md animate-pulse" />
										<div className="space-y-2">
											<div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
											<div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
										</div>
									</div>
									<div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
								</div>

								<div className="bg-white rounded-md shadow-sm p-6">
									<div className="h-6 w-28 bg-gray-200 rounded mb-4 animate-pulse" />
									<div className="space-y-3">
										{Array.from({ length: 4 }).map((_, i) => (
											<div key={i} className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
										))}
									</div>
								</div>
							</div>
						</div>

						<div className="mt-16">
							<div className="h-7 w-40 bg-gray-200 rounded mb-6 animate-pulse" />
							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
								{Array.from({ length: 3 }).map((_, i) => (
									<div key={i} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
										<div className="flex items-start justify-between mb-4">
											<div className="w-12 h-12 bg-gray-200 rounded-md animate-pulse" />
											<div className="h-5 w-5 bg-gray-200 rounded-full animate-pulse" />
										</div>
										<div className="h-5 w-3/4 bg-gray-200 rounded mb-2 animate-pulse" />
										<div className="h-4 w-1/3 bg-gray-200 rounded mb-4 animate-pulse" />
										<div className="space-y-2 mb-4">
											<div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
											<div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
											<div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
										</div>
										<div className="h-9 w-full bg-gray-200 rounded-md animate-pulse" />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
