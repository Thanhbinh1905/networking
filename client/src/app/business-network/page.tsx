"use client";

import {
	Building2,
	CheckCircle2,
	Network,
	Shield,
	Terminal,
	Wifi,
} from "lucide-react";
import { useMemo, useState } from "react";
import { DiagramRenderer } from "@/components/diagram/DiagramRenderer";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { businessNetworkConfigs } from "@/data/businessNetworkConfigs";
import { cn } from "@/lib/utils";

const sectionIconMap = {
	infrastructure: Network,
	wifi: Wifi,
	vpn: Shield,
	security: Shield,
	operations: CheckCircle2,
};

type ConfigSectionKey = keyof typeof sectionIconMap;

const sectionLabels: Record<ConfigSectionKey, string> = {
	infrastructure: "Network infrastructure",
	wifi: "Wi-Fi design",
	vpn: "VPN / remote access",
	security: "Security controls",
	operations: "Operations",
};

export default function BusinessNetworkPage() {
	const [selectedConfigId, setSelectedConfigId] = useState(
		businessNetworkConfigs[0].id,
	);
	const [currentStep, setCurrentStep] = useState(0);

	const selectedConfig = useMemo(
		() =>
			businessNetworkConfigs.find((config) => config.id === selectedConfigId) ??
			businessNetworkConfigs[0],
		[selectedConfigId],
	);

	function selectConfig(configId: string) {
		setSelectedConfigId(configId);
		setCurrentStep(0);
	}

	const sections: ConfigSectionKey[] = [
		"infrastructure",
		"wifi",
		"vpn",
		"security",
		"operations",
	];

	return (
		<div className="flex h-full flex-col bg-background">
			<header className="flex-none border-b bg-card px-8 py-6 lg:px-12">
				<div className="flex max-w-5xl flex-col gap-4">
					<div className="flex flex-wrap items-center gap-3">
						<Badge variant="secondary" className="w-fit font-mono">
							Business network demo
						</Badge>
						<Badge variant="outline" className="w-fit font-mono">
							4 company sizes
						</Badge>
					</div>
					<div className="flex flex-col gap-2">
						<h1 className="text-display-lg text-foreground">
							Compare company network architectures.
						</h1>
						<p className="max-w-4xl text-body-md text-muted-foreground">
							Choose a company size to inspect the expected infrastructure,
							network segmentation, Wi-Fi, VPN, security posture, operational
							practices, and example configuration commands.
						</p>
					</div>
				</div>
			</header>

			<div className="grid min-h-0 flex-1 gap-6 overflow-hidden p-6 xl:grid-cols-[300px_minmax(0,1fr)_380px] xl:p-8">
				<ScrollArea className="min-h-0">
					<div className="flex flex-col gap-3 pr-3">
						{businessNetworkConfigs.map((config) => {
							const isActive = config.id === selectedConfig.id;

							return (
								<button
									key={config.id}
									type="button"
									onClick={() => selectConfig(config.id)}
									className={cn(
										"flex min-h-36 cursor-pointer flex-col gap-4 rounded-xl border bg-card p-4 text-left shadow-level-2 transition-colors",
										isActive
											? "border-ring ring-2 ring-ring/20"
											: "hover:border-ring",
									)}
								>
									<div className="flex items-center justify-between gap-3">
										<Building2
											className={cn(
												"text-muted-foreground",
												isActive && "text-primary",
											)}
										/>
										<Badge variant={isActive ? "default" : "secondary"}>
											{config.label}
										</Badge>
									</div>
									<div className="flex flex-col gap-1">
										<span className="text-body-sm font-medium text-foreground">
											{config.title}
										</span>
										<span className="line-clamp-3 text-body-sm text-muted-foreground">
											{config.summary}
										</span>
									</div>
								</button>
							);
						})}
					</div>
				</ScrollArea>

				<div className="flex min-h-0 flex-col gap-6">
					<Card className="min-h-140 overflow-hidden bg-card p-0 shadow-level-3">
						<DiagramRenderer
							initialNodes={selectedConfig.diagram.nodes}
							initialEdges={selectedConfig.diagram.edges}
							steps={selectedConfig.diagram.steps}
							currentStep={currentStep}
							onStepChange={setCurrentStep}
							slug={`business-network-${selectedConfig.id}`}
						/>
					</Card>

					<Card className="shadow-level-2">
						<CardHeader>
							<CardTitle className="text-display-sm">
								Operating model.
							</CardTitle>
							<CardDescription className="text-body-sm">
								How this size of business should think about running its
								network.
							</CardDescription>
						</CardHeader>
						<CardContent className="text-body-md text-muted-foreground">
							{selectedConfig.operatingModel}
						</CardContent>
					</Card>
				</div>

				<ScrollArea className="min-h-0">
					<div className="flex flex-col gap-5 pr-3 pb-8">
						<Card className="shadow-level-2">
							<CardHeader>
								<CardTitle className="text-display-sm">
									{selectedConfig.label}
								</CardTitle>
								<CardDescription className="text-body-sm">
									{selectedConfig.summary}
								</CardDescription>
							</CardHeader>
							<CardContent className="flex flex-col gap-3">
								<p className="text-caption-mono text-muted-foreground">
									IP plan
								</p>
								<ul className="flex list-none flex-col gap-2 pl-0 text-body-sm text-muted-foreground">
									{selectedConfig.ipPlan.map((item) => (
										<li key={item} className="flex gap-2">
											<span className="text-muted-foreground">•</span>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>

						{sections.map((section) => {
							const Icon = sectionIconMap[section];
							const items = selectedConfig[section];

							return (
								<Card key={section} className="shadow-level-2">
									<CardHeader>
										<CardTitle className="flex items-center gap-2 text-display-sm">
											<Icon className="text-muted-foreground" />
											{sectionLabels[section]}
										</CardTitle>
									</CardHeader>
									<CardContent>
										<ul className="flex list-none flex-col gap-2 pl-0 text-body-sm text-muted-foreground">
											{items.map((item) => (
												<li key={item} className="flex gap-2">
													<span className="text-muted-foreground">•</span>
													<span>{item}</span>
												</li>
											))}
										</ul>
									</CardContent>
								</Card>
							);
						})}

						<Separator />

						<Card className="bg-primary text-primary-foreground shadow-level-4">
							<CardHeader>
								<CardTitle className="flex items-center gap-2 text-display-sm">
									<Terminal />
									Config examples.
								</CardTitle>
								<CardDescription className="text-primary-foreground/70">
									Pseudo-configs to make the design concrete.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex flex-col gap-3 overflow-x-auto rounded-md border border-primary-foreground/10 bg-primary p-4 text-code">
									<div className="flex justify-between gap-4 border-b border-primary-foreground/10 pb-2 text-primary-foreground/50">
										<span>Network config</span>
										<span>example</span>
									</div>
									<div className="flex flex-col gap-1">
										{selectedConfig.configExamples.map((command) => (
											<p key={command}>$ {command}</p>
										))}
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</ScrollArea>
			</div>
		</div>
	);
}
