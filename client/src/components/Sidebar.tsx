"use client";

import { Bookmark, CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { concepts } from "@/data/concepts";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/store/useProgressStore";

export function Sidebar() {
	const pathname = usePathname();
	const { completedConcepts, bookmarkedConcepts } = useProgressStore();

	return (
		<aside className="w-64 h-screen border-r border-border-subtle bg-cream flex flex-col overflow-y-auto">
			<div className="p-6 border-b border-border-subtle">
				<h1 className="text-xl font-semibold tracking-tight text-charcoal">
					Network Visualizer
				</h1>
			</div>
			<nav className="flex-1 p-4 space-y-1">
				<Link
					href="/concepts"
					className={cn(
						"block px-3 py-2 rounded-md text-sm font-medium transition-colors",
						pathname === "/concepts"
							? "bg-charcoal/5 text-charcoal"
							: "text-muted hover:bg-charcoal/3 hover:text-charcoal",
					)}
				>
					Overview
				</Link>
				<div className="pt-6 pb-2">
					<p className="px-3 text-[10px] font-bold text-muted uppercase tracking-widest">
						Concepts
					</p>
				</div>
				<div className="space-y-0.5">
					{concepts.map((concept) => {
						const isCompleted = completedConcepts.includes(concept.id);
						const isBookmarked = bookmarkedConcepts.includes(concept.id);
						const isActive = pathname === `/concepts/${concept.slug}`;

						return (
							<Link
								key={concept.id}
								href={`/concepts/${concept.slug}`}
								className={cn(
									"flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors",
									isActive
										? "bg-charcoal/5 text-charcoal font-medium"
										: "text-muted hover:bg-charcoal/3 hover:text-charcoal",
								)}
							>
								<div className="flex items-center gap-2.5 min-w-0">
									{isCompleted ? (
										<CheckCircle2 className="w-4 h-4 text-charcoal/83 flex-shrink-0" />
									) : (
										<Circle className="w-4 h-4 text-charcoal/20 flex-shrink-0" />
									)}
									<span className="truncate">
										{concept.order}. {concept.title}
									</span>
								</div>
								{isBookmarked && (
									<Bookmark className="w-3 h-3 text-charcoal/40 fill-charcoal/40 flex-shrink-0" />
								)}
							</Link>
						);
					})}
				</div>
			</nav>
		</aside>
	);
}
