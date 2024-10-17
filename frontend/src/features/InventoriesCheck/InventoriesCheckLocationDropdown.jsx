// Import Libraries
import Select from 'react-select';
import React, { useState } from 'react';

// Import Assets
import '../../assets/css/features/InventoriesCheck/InventoriesCheckLocationDropdown.css';

function InventoriesCheckLocationDropdown({ locations, selectedLocation, onSelectLocation }) {
    const [selectedBuilding, setSelectedBuilding] = useState(selectedLocation.buildingCode || null);
    const [selectedFloor, setSelectedFloor] = useState(selectedLocation.floorCode || null);
    const [selectedRoom, setSelectedRoom] = useState(selectedLocation.roomId || null);

    const buildings = locations || [];
    const selectedBuildingData = buildings.find(building => building.building_code === selectedBuilding);
    const selectedFloors = selectedBuildingData?.floors || [];
    const selectedFloorData = selectedFloors.find(floor => floor.floor_code === selectedFloor);
    const selectedRooms = selectedFloorData?.rooms || [];

    const updateLocation = (updatedFields) => {
        const newLocation = {
            buildingCode: selectedBuilding,
            buildingName: buildings.find(b => b.building_code === selectedBuilding)?.building_name || null,
            floorCode: selectedFloor,
            floorNo: selectedFloors.find(f => f.floor_code === selectedFloor)?.floor_no || null,
            roomId: selectedRoom,
            roomName: selectedRooms.find(r => r.room_id === selectedRoom)?.room_name || null,
            ...updatedFields
        };
        onSelectLocation(newLocation);
    };

    const handleBuildingSelect = (building) => {
        const newBuildingCode = building ? building.value : null;
        setSelectedBuilding(newBuildingCode);
        setSelectedFloor(null);
        setSelectedRoom(null);
        updateLocation({ buildingCode: newBuildingCode, floorCode: null, roomId: null });
    };

    const handleFloorSelect = (floor) => {
        const newFloorCode = floor ? floor.value : null;
        setSelectedFloor(newFloorCode);
        setSelectedRoom(null);
        updateLocation({ floorCode: newFloorCode, roomId: null });
    };

    const handleRoomSelect = (room) => {
        const newRoomId = room ? room.value : null;
        setSelectedRoom(newRoomId);
        const roomData = selectedRooms.find(r => r.room_id === newRoomId);
        updateLocation({ roomId: newRoomId, roomName: roomData ? roomData.room_name : null });
    };

    const buildingOptions = buildings.map(building => ({
        value: building.building_code,
        label: building.building_name,
    }));

    const floorOptions = selectedFloors.map(floor => ({
        value: floor.floor_code,
        label: floor.floor_no,
    }));

    const roomOptions = selectedRooms.map(room => ({
        value: room.room_id,
        label: room.room_name,
    }));

    return (
        <div className="inventories-check-location-dropdown">
            <label className="dropdown-label">
                <strong>{'สถานที่ตั้ง'}</strong>
                <strong className="require-star">{' *'}</strong>
            </label>
            <div className="dropdown-container" title="อาคาร">
                <Select className="select-building-dropdown" value={buildingOptions.find(option => option.value === selectedBuilding)} onChange={handleBuildingSelect} options={buildingOptions} placeholder="- เลือกอาคาร -" noOptionsMessage={() => "ไม่พบตัวเลือก"} isClearable />
            </div>
            {selectedBuilding && selectedFloors.length > 0 && (
                <div className="dropdown-container" title="ชั้น">
                    <Select className="select-floor-dropdown" value={floorOptions.find(option => option.value === selectedFloor)} onChange={handleFloorSelect} options={floorOptions} placeholder="- เลือกชั้น -" noOptionsMessage={() => "ไม่พบตัวเลือก"} isClearable />
                </div>
            )}
            {selectedFloor && selectedRooms.length > 0 && (
                <div className="dropdown-container" title="ห้อง">
                    <Select className="select-room-dropdown" value={roomOptions.find(option => option.value === selectedRoom)} onChange={handleRoomSelect} options={roomOptions} placeholder="- เลือกห้อง -" noOptionsMessage={() => "ไม่พบตัวเลือก"} isClearable />
                </div>
            )}
        </div>
    );
}

export default InventoriesCheckLocationDropdown;