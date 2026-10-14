import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
export default function Navbar(){
 const [open,setOpen]=useState(false);
 return <header className="ap-header"><div className="ap-container ap-nav">
 <Link to="/" className="ap-brand" aria-label="Ask Pakistan home"><span className="ap-brand-emblem">✦</span><span>ask<span className="ap-brand-green">pakistan</span><small>Public information, simplified.</small></span></Link>
 <div className="ap-nav-right"><span className="ap-independent">Independent public information project</span><button className="ap-menu-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open?<X size={19}/>:<Menu size={19}/>} Menu</button></div>
 </div>{open&&<nav className="ap-drawer ap-container" aria-label="Main navigation">{[['/','Home'],['/services','Explore services'],['/how-it-works','How it works'],['/privacy','Privacy'],['/news','News']].map(([to,label])=><NavLink onClick={()=>setOpen(false)} key={to} to={to}>{label}<ArrowUpRight size={16}/></NavLink>)}</nav>}</header>
}