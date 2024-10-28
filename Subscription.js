import React, { useState } from 'react';

const Subscription = () => {
    const [subscriptions, setSubscriptions] = useState([
        { id: 1, name: 'Netflix', status: 'active', nextBillingDate: '2024-11-01', gracePeriod: false },
        { id: 2, name: 'Spotify', status: 'inactive', nextBillingDate: '2024-10-15', gracePeriod: true },
        { id: 3, name: 'Amazon Prime', status: 'active', nextBillingDate: '2024-10-30', gracePeriod: false },
    ]);

    const [filter, setFilter] = useState('all');

    const handleRenew = (id) => {
        const updatedSubscriptions = subscriptions.map(sub =>
            sub.id === id ? { ...sub, status: 'active', nextBillingDate: '2024-11-01' } : sub
        );
        setSubscriptions(updatedSubscriptions);
        alert('Subscription renewed successfully!'); // Alert on renew
    };

    const handleCancel = (id) => {
        const updatedSubscriptions = subscriptions.map(sub =>
            sub.id === id ? { ...sub, status: 'inactive' } : sub
        );
        setSubscriptions(updatedSubscriptions);
        alert('Subscription canceled successfully!'); // Alert on cancel
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredSubscriptions = subscriptions.filter(sub => {
        if (filter === 'all') return true;
        return sub.status === filter;
    });

    const calculateDaysUntilBilling = (nextBillingDate) => {
        const today = new Date();
        const billingDate = new Date(nextBillingDate);
        const timeDiff = billingDate - today;
        return Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
    };

    return (
        <div className="subscription">
            <h3>Manage Your Subscriptions</h3>
            <select value={filter} onChange={handleFilterChange}>
                <option value="all">All Subscriptions</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>

            {filteredSubscriptions.map(({ id, name, status, nextBillingDate, gracePeriod }) => {
                const daysUntilBilling = calculateDaysUntilBilling(nextBillingDate);

                return (
                    <div key={id} className="subscription-card">
                        <h4>{name}</h4>
                        <p>Status: {status}</p>
                        <p>Next Billing Date: {nextBillingDate} (in {daysUntilBilling} days)</p>
                        {gracePeriod && <p style={{ color: 'red' }}>You are in the grace period. Please update your payment information!</p>}
                        <button onClick={() => handleRenew(id)}>Renew Subscription</button>
                        <button onClick={() => handleCancel(id)}>Cancel Subscription</button>
                    </div>
                );
            })}
        </div>
    );
};

export default Subscription;
