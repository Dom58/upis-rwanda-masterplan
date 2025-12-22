import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false });

const UpidataDisplay = ({ data }: { data: any }) => {
    return (
        <>
            {(!!data && data.owners?.length > 0) ? (
                <>
                    <h1 className="mb-5 text-3xl font-bold">UPI Data Overview</h1>
                    <div className="grid max-w-full p-6 mx-auto space-x-4 space-y-6 bg-white rounded-lg shadow-lg lg:grid-cols-2 sm:grid-cols-1">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">Land Information</h2>
                            <p><strong>UPI:</strong> {data.upi}</p>
                            <p><strong>Size: </strong>
                                <span className="ml-1 font-semibold text-orange-400">
                                    {data.size} sq. m
                                </span>
                            </p>
                            <p><strong>Land Use (English):</strong>
                                <span className="ml-1 font-semibold text-orange-400">
                                    {data.landUseNameEnglish}
                                </span>
                            </p>
                            <p><strong>Land Use (Kinyarwanda):</strong>
                                <span className="ml-1 font-semibold text-orange-400">
                                    {data.landUseNameKinyarwanda}
                                </span>
                            </p>
                            <p><strong>Right Type:</strong> {data.rightType}</p>
                            <p><strong>Remaining Lease Term:</strong> {data.remainingLeaseTerm} years</p>
                            <p><strong>In Process:</strong> {data.inProcess ? "Yes" : "No"}</p>
                            <p><strong>Coordinates Reference System:</strong> {data.coordinateReferenceSystem}</p>
                        </div>

                        <div className="p-4 bg-gray-100 shadow-md rounded-2xl">
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-orange-400">Owners</h2>
                                {data.owners && data.owners?.map((owner: any, index: any) => (
                                    <div key={index} className="py-2 border-b">
                                        <p><strong>Name:</strong> {owner?.fullName}</p>
                                        <p><strong>ID No:</strong> {owner?.idNo}</p>
                                        <p><strong>Country:</strong> {owner?.countryName}</p>
                                        <p><strong>Gender:</strong> {owner?.gender}</p>
                                        <p><strong>Marital Status:</strong>
                                            <span className="text-orange-400"> {owner?.maritalStatus}</span>
                                        </p>
                                        <p><strong>Share Percentage:</strong>
                                            <span className="text-orange-400"> {owner?.sharePercentage}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">Representative Information</h2>
                            <p><strong>Name:</strong> {`${data?.representative?.surname} ${data?.representative?.foreNames}`}</p>
                            <p><strong>ID No:</strong> {data.representative?.idNo}</p>
                            <p><strong>Country:</strong> {data.representative?.countryName}</p>
                            <p><strong>Gender:</strong> {data.representative?.gender}</p>
                            <p><strong>Marital Status:</strong> {data.representative?.maritalStatus}</p>
                            <p><strong>Current address: </strong>
                                {` ${data.representative?.address.village.villageName}, ${data.representative?.address.cell.cellName}, ${data.representative.address.sector.sectorName}, ${data.representative.address.district.districtName}, ${data.representative.address.province.provinceName}`}
                            </p>
                        </div>

                        <div>

                            <div className="p-6 mb-6 shadow-md bg-orange-50 rounded-2xl">
                                <h2 className="text-xl font-semibold">Parcel Location</h2>
                                <p><strong>Village:</strong> {data.parcelLocation?.village.villageName}</p>
                                <p><strong>Cell:</strong> {data.parcelLocation?.cell.cellName}</p>
                                <p><strong>Sector:</strong> {data.parcelLocation?.sector.sectorName}</p>
                                <p><strong>District:</strong> {data.parcelLocation?.district.districtName}</p>
                                <p><strong>Province:</strong> {data.parcelLocation?.province.provinceName}</p>
                            </div>
                        </div>

                        <div className="p-6 mb-6 bg-gray-100 shadow-md rounded-2xl">
                            <h2 className="text-xl font-semibold text-orange-400">Planned Land Uses</h2>
                            {data && data.plannedLandUses?.map((planned: any, index: any) => (
                                <div key={index} className="py-2 border-b">
                                    <p className="text-gray-700">
                                        <strong>Land Use Name:</strong> <span className="font-semibold text-orange-400">{planned?.landUseName}</span>
                                    </p>
                                    <p className="text-gray-700">
                                        <strong>Area:</strong> <span className="font-semibold text-orange-400">{planned?.area}sq. m</span>
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">Valuation Value</h2>
                            <p><strong>Minimum Price:</strong> RWF {data.valuationValue?.minPrice}</p>
                            <p><strong>Maximum Price:</strong> RWF {data.valuationValue?.maxPrice}</p>
                        </div>
                    </div>

                    {data?.coordinates[0] && (
                        <div className='p-6 mt-6 bg-white rounded-lg shadow-lg'>
                            <h1 className="mb-2 text-3xl font-extrabold">View on map</h1>
                            <MapComponent coordinates={data?.coordinates[0]} />
                        </div>
                    )}
                </>
            ) : <p className="text-red-500">No UPI data available. Check well the UPI</p>
            }
        </>
    );
};

export default UpidataDisplay;
