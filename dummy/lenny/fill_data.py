import csv
import json

data_dict = {
    "Anthropic": {"Website": "https://www.anthropic.com", "Frontend": "React/Next.js", "Backend": "Python, Rust", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Applied Compute": {"Website": "https://appliedcompute.com", "Frontend": "React", "Backend": "Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "BaseTen": {"Website": "https://www.baseten.co", "Frontend": "React", "Backend": "Python, Go", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Black Forest Labs": {"Website": "https://blackforestlabs.ai", "Frontend": "React", "Backend": "Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Chai Discovery": {"Website": "https://www.chaidiscovery.com", "Frontend": "React", "Backend": "Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Cognition": {"Website": "https://www.cognition.ai", "Frontend": "React", "Backend": "Python, TypeScript", "Infrastructure": "AWS", "Functional Programming": "None"},
    "CoreWeave": {"Website": "https://www.coreweave.com", "Frontend": "React", "Backend": "Go, Python", "Infrastructure": "Kubernetes, Bare Metal", "Functional Programming": "None"},
    "Crusoe": {"Website": "https://crusoe.ai", "Frontend": "React", "Backend": "Python, Go", "Infrastructure": "AWS, Own DCs", "Functional Programming": "None"},
    "Etched": {"Website": "https://www.etched.com", "Frontend": "React", "Backend": "Python, C++", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Exa": {"Website": "https://exa.ai", "Frontend": "React", "Backend": "Python, Go", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Fal": {"Website": "https://fal.ai", "Frontend": "React", "Backend": "Python, Rust", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Fireworks": {"Website": "https://fireworks.ai", "Frontend": "React", "Backend": "Python, C++", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Lambda": {"Website": "https://lambdalabs.com", "Frontend": "React", "Backend": "Python", "Infrastructure": "Bare Metal", "Functional Programming": "None"},
    "LangChain": {"Website": "https://www.langchain.com", "Frontend": "React", "Backend": "Python, TypeScript", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Liquid AI": {"Website": "https://www.liquid.ai", "Frontend": "React", "Backend": "Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "LlamaIndex": {"Website": "https://www.llamaindex.ai", "Frontend": "React", "Backend": "Python, TypeScript", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Mistral AI": {"Website": "https://mistral.ai", "Frontend": "React", "Backend": "Python, Rust", "Infrastructure": "AWS, GCP", "Functional Programming": "None"},
    "Modal": {"Website": "https://modal.com", "Frontend": "React", "Backend": "Python, Rust", "Infrastructure": "AWS", "Functional Programming": "None"},
    "OpenAI": {"Website": "https://openai.com", "Frontend": "React", "Backend": "Python, Rust", "Infrastructure": "Azure", "Functional Programming": "None"},
    "Prime Intellect": {"Website": "https://www.primeintellect.ai", "Frontend": "React", "Backend": "Python, Go", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Safe Superintelligence": {"Website": "https://ssi.inc", "Frontend": "React", "Backend": "Python, C++", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Together": {"Website": "https://www.together.ai", "Frontend": "React", "Backend": "Python, C++", "Infrastructure": "AWS", "Functional Programming": "None"},
    "World Labs": {"Website": "https://www.worldlabs.ai", "Frontend": "React", "Backend": "Python, C++", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Abridge": {"Website": "https://www.abridge.com", "Frontend": "React", "Backend": "Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Basis": {"Website": "https://www.basis.ai", "Frontend": "React", "Backend": "Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Clay": {"Website": "https://www.clay.com", "Frontend": "React", "Backend": "Node.js, TypeScript", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Decagon": {"Website": "https://decagon.ai", "Frontend": "React", "Backend": "Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "ElevenLabs": {"Website": "https://elevenlabs.io", "Frontend": "React", "Backend": "Python, C++", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Factory": {"Website": "https://www.factory.ai", "Frontend": "React", "Backend": "Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Gamma": {"Website": "https://gamma.app", "Frontend": "React", "Backend": "Node.js, Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Genspark": {"Website": "https://www.genspark.ai", "Frontend": "React", "Backend": "Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Glean": {"Website": "https://www.glean.com", "Frontend": "React", "Backend": "Go, Python", "Infrastructure": "GCP", "Functional Programming": "None"},
    "Granola": {"Website": "https://www.granola.ai", "Frontend": "React", "Backend": "Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Harvey": {"Website": "https://www.harvey.ai", "Frontend": "React", "Backend": "Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Legora": {"Website": "https://www.legora.ai", "Frontend": "React", "Backend": "Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "OpenEvidence": {"Website": "https://www.openevidence.com", "Frontend": "React", "Backend": "Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Profound": {"Website": "https://www.profound.ai", "Frontend": "React", "Backend": "Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Reflection AI": {"Website": "https://www.reflection.ai", "Frontend": "React", "Backend": "Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Sierra": {"Website": "https://sierra.ai", "Frontend": "React", "Backend": "Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Surge AI": {"Website": "https://www.surgehq.ai", "Frontend": "React", "Backend": "Python, Go", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Thinking Machines": {"Website": "https://thinkingmachin.es", "Frontend": "React", "Backend": "Python", "Infrastructure": "GCP", "Functional Programming": "None"},
    "Wispr Flow": {"Website": "https://www.flow.wispr.ai", "Frontend": "React", "Backend": "Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Chainguard": {"Website": "https://www.chainguard.dev", "Frontend": "React", "Backend": "Go", "Infrastructure": "GCP", "Functional Programming": "None"},
    "ClickHouse": {"Website": "https://clickhouse.com", "Frontend": "React", "Backend": "C++", "Infrastructure": "AWS, GCP, Azure", "Functional Programming": "None"},
    "Cloudflare": {"Website": "https://www.cloudflare.com", "Frontend": "React", "Backend": "Go, Rust", "Infrastructure": "Bare Metal", "Functional Programming": "None"},
    "Cursor": {"Website": "https://www.cursor.com", "Frontend": "React", "Backend": "TypeScript, Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Databricks": {"Website": "https://databricks.com", "Frontend": "React", "Backend": "Scala", "Infrastructure": "AWS, Azure", "Functional Programming": "Scala"},
    "Hex": {"Website": "https://hex.tech", "Frontend": "React", "Backend": "Python, Node.js", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Linear": {"Website": "https://linear.app", "Frontend": "React", "Backend": "Node.js, TypeScript", "Infrastructure": "GCP", "Functional Programming": "None"},
    "Lovable": {"Website": "https://lovable.dev", "Frontend": "React", "Backend": "TypeScript", "Infrastructure": "AWS", "Functional Programming": "None"},
    "n8n": {"Website": "https://n8n.io", "Frontend": "Vue.js", "Backend": "Node.js, TypeScript", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Parallel Web Systems": {"Website": "https://parallel.com", "Frontend": "React", "Backend": "Go", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Pierre Computer": {"Website": "https://pierre.co", "Frontend": "React", "Backend": "Go", "Infrastructure": "AWS", "Functional Programming": "None"},
    "PostHog": {"Website": "https://posthog.com", "Frontend": "React", "Backend": "Python, Django", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Replit": {"Website": "https://replit.com", "Frontend": "React", "Backend": "Go, Python, Nix", "Infrastructure": "GCP", "Functional Programming": "None"},
    "Supabase": {"Website": "https://supabase.com", "Frontend": "React", "Backend": "Elixir, Go", "Infrastructure": "AWS", "Functional Programming": "Elixir"},
    "Temporal": {"Website": "https://temporal.io", "Frontend": "React", "Backend": "Go", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Turbopuffer": {"Website": "https://turbopuffer.com", "Frontend": "React", "Backend": "Rust", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Vercel": {"Website": "https://vercel.com", "Frontend": "React/Next.js", "Backend": "Node.js, Go", "Infrastructure": "AWS", "Functional Programming": "None"},
    "WorkOS": {"Website": "https://workos.com", "Frontend": "React", "Backend": "TypeScript, Node.js", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Anduril": {"Website": "https://www.anduril.com", "Frontend": "React", "Backend": "C++, Rust, Go", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Applied Intuition": {"Website": "https://www.appliedintuition.com", "Frontend": "React", "Backend": "C++, Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Bedrock Robotics": {"Website": "https://www.bedrock.com", "Frontend": "React", "Backend": "C++, Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Figure": {"Website": "https://figure.ai", "Frontend": "React", "Backend": "C++, Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Helsing": {"Website": "https://helsing.ai", "Frontend": "React", "Backend": "Rust, Python, C++", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Physical Intelligence": {"Website": "https://www.physicalintelligence.company", "Frontend": "React", "Backend": "Python, C++", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Saronic": {"Website": "https://www.saronic.com", "Frontend": "React", "Backend": "C++, Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Shield AI": {"Website": "https://shield.ai", "Frontend": "React", "Backend": "C++, Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Skild": {"Website": "https://skild.ai", "Frontend": "React", "Backend": "Python, C++", "Infrastructure": "AWS", "Functional Programming": "None"},
    "SpaceX": {"Website": "https://www.spacex.com", "Frontend": "Angular, React", "Backend": "C++, Python", "Infrastructure": "Bare Metal", "Functional Programming": "None"},
    "Sunday Robotics": {"Website": "https://sundayrobotics.com", "Frontend": "React", "Backend": "C++, Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Tesla": {"Website": "https://www.tesla.com", "Frontend": "React", "Backend": "C++, Python", "Infrastructure": "Bare Metal, AWS", "Functional Programming": "None"},
    "Waymo": {"Website": "https://waymo.com", "Frontend": "React", "Backend": "C++, Python", "Infrastructure": "GCP", "Functional Programming": "None"},
    "Airwallex": {"Website": "https://www.airwallex.com", "Frontend": "React", "Backend": "Java, Kotlin", "Infrastructure": "AWS, GCP", "Functional Programming": "None"},
    "Deel": {"Website": "https://www.deel.com", "Frontend": "React", "Backend": "Node.js, Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Kalshi": {"Website": "https://kalshi.com", "Frontend": "React", "Backend": "OCaml, Python", "Infrastructure": "AWS", "Functional Programming": "OCaml"},
    "Mercury": {"Website": "https://mercury.com", "Frontend": "React", "Backend": "Haskell", "Infrastructure": "AWS", "Functional Programming": "Haskell"},
    "Polymarket": {"Website": "https://polymarket.com", "Frontend": "React", "Backend": "Go, Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Ramp": {"Website": "https://ramp.com", "Frontend": "React", "Backend": "Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Revolut": {"Website": "https://www.revolut.com", "Frontend": "React", "Backend": "Java, Scala", "Infrastructure": "GCP", "Functional Programming": "Scala"},
    "Rippling": {"Website": "https://www.rippling.com", "Frontend": "React", "Backend": "Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Stripe": {"Website": "https://stripe.com", "Frontend": "React", "Backend": "Ruby", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Vanta": {"Website": "https://www.vanta.com", "Frontend": "React", "Backend": "Go, Node.js", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Airbnb": {"Website": "https://www.airbnb.com", "Frontend": "React", "Backend": "Java, Ruby", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Figma": {"Website": "https://www.figma.com", "Frontend": "React", "Backend": "C++, Rust", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Handshake": {"Website": "https://joinhandshake.com", "Frontend": "React", "Backend": "Ruby on Rails, Go", "Infrastructure": "GCP", "Functional Programming": "None"},
    "Mercor": {"Website": "https://mercor.com", "Frontend": "React", "Backend": "Python, Node.js", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Notion": {"Website": "https://www.notion.so", "Frontend": "React", "Backend": "Node.js, Go", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Periodic Labs": {"Website": "https://periodiclabs.com", "Frontend": "React", "Backend": "Python", "Infrastructure": "AWS", "Functional Programming": "None"},
    "Shopify": {"Website": "https://www.shopify.com", "Frontend": "React", "Backend": "Ruby on Rails", "Infrastructure": "GCP", "Functional Programming": "None"},
    "Whatnot": {"Website": "https://www.whatnot.com", "Frontend": "React", "Backend": "Python, Elixir", "Infrastructure": "AWS", "Functional Programming": "Elixir"},
    "Google": {"Website": "https://about.google", "Frontend": "Angular, React", "Backend": "C++, Java, Python, Go", "Infrastructure": "GCP", "Functional Programming": "None"},
    "NVIDIA": {"Website": "https://www.nvidia.com", "Frontend": "React, Angular", "Backend": "C++, Python", "Infrastructure": "Bare Metal", "Functional Programming": "None"},
    "Palantir": {"Website": "https://www.palantir.com", "Frontend": "React", "Backend": "Java, Go", "Infrastructure": "AWS", "Functional Programming": "None"}
}

input_file = '/home/rgroot/MuggleBornPadawan/dummy/dummy/lenny100_companies.csv'
output_file = '/home/rgroot/MuggleBornPadawan/dummy/dummy/lenny100_companies.csv'

rows = []
with open(input_file, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    header = next(reader)
    for row in reader:
        rows.append(row)

with open(output_file, 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(["Name", "Category", "Website", "Frontend", "Backend", "Infrastructure", "Functional Programming"])
    for row in rows:
        name = row[0]
        category = row[1]
        info = data_dict.get(name, {})
        website = info.get("Website", f"https://www.{name.replace(' ', '').lower()}.com")
        frontend = info.get("Frontend", "React")
        backend = info.get("Backend", "Python")
        infra = info.get("Infrastructure", "AWS")
        fp = info.get("Functional Programming", "None")
        writer.writerow([name, category, website, frontend, backend, infra, fp])

print("CSV updated.")
