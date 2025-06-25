import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/requests', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                setGroups(response.data);
            } catch (error) {
                alert('Error fetching groups', error);
            }
        };
        fetchGroups();
    }, []);

    const handleComplete = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/complete/${id}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            alert('Group completed');
        } catch (error) {
            alert('Error completing group', error);
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <ul>
                {groups.map((group) => (
                    <li key={group._id}>
                        {group.name} - {group.subscription} - {group.members} members
                        <button onClick={() => handleComplete(group._id)}>Complete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminDashboard;