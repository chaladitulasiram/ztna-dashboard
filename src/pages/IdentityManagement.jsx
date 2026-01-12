import React from 'react';
import { Search, Filter, ShieldCheck, ShieldAlert, MoreVertical } from 'lucide-react';

const UserRow = ({ name, email, role, status, mfa }) => (
    <tr className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
        <td className="py-4 px-4">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center font-bold text-xs">
                    {name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                    <p className="text-sm font-medium text-white">{name}</p>
                    <p className="text-xs text-slate-500">{email}</p>
                </div>
            </div>
        </td>
        <td className="py-4 px-4">
            <span className="text-xs font-medium px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {role}
            </span>
        </td>
        <td className="py-4 px-4">
            <div className="flex items-center gap-2">
                {mfa ? (
                    <><ShieldCheck size={14} className="text-emerald-400" /> <span className="text-xs text-emerald-400">Enabled</span></>
                ) : (
                    <><ShieldAlert size={14} className="text-rose-400" /> <span className="text-xs text-rose-400">Disabled</span></>
                )}
            </div>
        </td>
        <td className="py-4 px-4 text-right">
            <button className="text-slate-500 hover:text-white">
                <MoreVertical size={18} />
            </button>
        </td>
    </tr>
);

const IdentityManagement = () => {
    const users = [
        { name: "Admin User", email: "admin@ztna.io", role: "Super Admin", mfa: true },
        { name: "John Doe", email: "john@company.com", role: "Developer", mfa: false },
        { name: "Jane Smith", email: "jane@company.com", role: "Security Analyst", mfa: true },
    ];

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-white">Identity Management</h1>
                <p className="text-slate-400">Manage user identities and access privileges</p>
            </header>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-purple-500/50 transition-all text-sm"
                    />
                </div>
                <button className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-700 transition-all">
                    <Filter size={18} />
                    Filter
                </button>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-800/30 text-slate-400 text-xs uppercase tracking-wider">
                            <th className="py-4 px-4 font-semibold">User</th>
                            <th className="py-4 px-4 font-semibold">Role</th>
                            <th className="py-4 px-4 font-semibold">MFA Status</th>
                            <th className="py-4 px-4 text-right font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => <UserRow key={idx} {...user} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default IdentityManagement;