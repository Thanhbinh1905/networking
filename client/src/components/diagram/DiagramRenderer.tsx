"use client";

import {
	Background,
	Controls,
	type Edge,
	type Node,
	Panel,
	ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";
import { useMemo } from "react";
import type { DiagramStep } from "@/data/diagrams";
import { CustomEdge } from "./CustomEdge";
import { CustomNode, type CustomNodeData } from "./CustomNode";

const nodeTypes = {
	custom: CustomNode,
};

const edgeTypes = {
	custom: CustomEdge,
};

interface DiagramRendererProps {
	initialNodes: Node<CustomNodeData>[];
	initialEdges: Edge[];
	steps?: DiagramStep[];
	currentStep: number;
	onStepChange: (step: number) => void;
}

export function DiagramRenderer({
	initialNodes,
	initialEdges,
	steps = [],
	currentStep,
	onStepChange,
}: DiagramRendererProps) {
	const step = steps[currentStep];

	const nodes = useMemo(
		() =>
			initialNodes.map((node) => ({
				...node,
				data: {
					...node.data,
					active: step?.activeNodes?.includes(node.id) || false,
				},
			})),
		[initialNodes, step],
	);

	const edges = useMemo(
		() =>
			initialEdges.map((edge) => ({
				...edge,
				animated: step?.activeEdges?.includes(edge.id) || false,
				style: {
					...edge.style,
					stroke: step?.activeEdges?.includes(edge.id) ? "#1c1c1c" : "#eceae4",
					strokeWidth: step?.activeEdges?.includes(edge.id) ? 3 : 2,
				},
			})),
		[initialEdges, step],
	);

	return (
		<div className="w-full h-full bg-cream">
			<ReactFlow
				nodes={nodes}
				edges={edges}
				nodeTypes={nodeTypes}
				edgeTypes={edgeTypes}
				fitView
				colorMode="light"
			>
				<Background color="#eceae4" gap={20} />
				<Controls className="bg-cream border-border-subtle shadow-sm" />

				{steps.length > 0 && (
					<Panel
						position="bottom-center"
						className="bg-cream p-5 rounded-xl shadow-focus border border-border-subtle flex flex-col gap-3 min-w-[360px] mb-8"
					>
						<div className="flex items-center justify-between">
							<span className="text-[10px] font-bold uppercase text-muted tracking-widest">
								Step {currentStep + 1} of {steps.length}
							</span>
							<span className="text-sm font-semibold text-charcoal">
								{steps[currentStep].label}
							</span>
						</div>

						<p className="text-xs text-charcoal-82 leading-relaxed min-h-[40px]">
							{steps[currentStep].description}
						</p>

						<div className="flex items-center justify-center gap-4 pt-2">
							<button
								type="button"
								onClick={() => onStepChange(0)}
								disabled={currentStep === 0}
								className="p-2 hover:bg-charcoal/5 rounded-md disabled:opacity-20 transition-colors text-charcoal"
								title="Restart"
							>
								<RotateCcw className="w-4 h-4" />
							</button>
							<button
								type="button"
								onClick={() => onStepChange(Math.max(0, currentStep - 1))}
								disabled={currentStep === 0}
								className="p-2 hover:bg-charcoal/5 rounded-md disabled:opacity-20 transition-colors text-charcoal"
							>
								<SkipBack className="w-4 h-4" />
							</button>
							<button
								type="button"
								className="bg-charcoal text-off-white p-2.5 rounded-full hover:opacity-90 transition-all btn-inset-shadow shadow-md active:scale-95"
								onClick={() => onStepChange((currentStep + 1) % steps.length)}
							>
								<Play className="w-5 h-5 fill-current" />
							</button>
							<button
								type="button"
								onClick={() =>
									onStepChange(Math.min(steps.length - 1, currentStep + 1))
								}
								disabled={currentStep === steps.length - 1}
								className="p-2 hover:bg-charcoal/5 rounded-md disabled:opacity-20 transition-colors text-charcoal"
							>
								<SkipForward className="w-4 h-4" />
							</button>
						</div>
					</Panel>
				)}
			</ReactFlow>
		</div>
	);
}
