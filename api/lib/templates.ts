import handlebars from "npm:handlebars";
import { basename, extname } from "https://deno.land/std/path/mod.ts";

/**
 * Precompiles all Handlebars templates in the templates directory
 * @returns An object with template names as keys and compiled template functions as values
 */
export async function loadTemplates(templatesDir: string = "./templates") {
    const compiledTemplates: Record<string, handlebars.TemplateDelegate> = {};

    try {
        // Ensure the templates directory exists
        try {
            await Deno.stat(templatesDir);
        } catch (error) {
            if (error instanceof Deno.errors.NotFound) {
                console.error(`Templates directory not found: ${templatesDir}`);
                return compiledTemplates;
            }
            throw error;
        }

        // Get all files in the templates directory
        const templateFiles = [];
        for await (const entry of Deno.readDir(templatesDir)) {
            if (entry.isFile && extname(entry.name) === ".hbs") {
                templateFiles.push(entry.name);
            }
        }

        // Compile each template
        for (const file of templateFiles) {
            const templatePath = `${templatesDir}/${file}`;
            const templateContent = await Deno.readTextFile(templatePath);

            // Get template name without extension (e.g., "default.hbs" -> "default")
            const templateName = basename(file, ".hbs");

            try {
                // Compile the template
                compiledTemplates[templateName] = handlebars.compile(templateContent);
                console.log(`Template compiled: ${templateName}`);
            } catch (error) {
                console.error(`Error compiling template ${file}: ${error}`);
            }
        }

        console.log(`Precompiled ${Object.keys(compiledTemplates).length} templates.`);
        return compiledTemplates;
    } catch (error) {
        console.error(`Failed to precompile templates: ${error}`);
        return compiledTemplates;
    }
}
